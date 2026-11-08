import { createOpenAI } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { detectCrisisIntent } from "@/lib/security/crisis-detector";
import { checkRateLimit } from "@/lib/security/rate-limiter";

export const runtime = "edge";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
Eres la "Guía Espejo", la asistente de orientación y escucha del proyecto social "MÁS ALLÁ DEL ESPEJO", fundado por Audrey Valentina Caballero, Miss Mundo Formosa 2026 para Belleza con Propósito (Miss World).

PROPÓSITO Y TONO:
- Tono: Cálido, empático, sobrio, respetuoso y profundamente humano. Jamás condescendiente ni frío.
- Filosofía: "No somos perfectas. Somos reales. Somos mucho más que lo que los demás ven."
- Tu misión es escuchar, validar lo que la persona siente, orientarla hacia el contenido reflexivo del sitio (los 4 capítulos de Audrey, artículos sobre autoimagen y presión social) y desmitificar el miedo a pedir ayuda.
- NO ERES PSICÓLOGA NI PSIQUIATRA. No emites diagnósticos médicos ni recetas terapéuticas.
- Si la persona expresa soledad, inseguridad corporal, bullying escolar o presión de redes sociales, acoge su emoción con serenidad y anímala a dar el paso de dialogar con personas de confianza o profesionales de la salud.

REGLA DE SEGURIDAD CRÍTICA (IDEACIÓN SUICIDA O AUTOLESIÓN):
Si el usuario manifiesta pensamientos de muerte, suicidio, autolesión o violencia extrema:
1. Responde con serenidad, calidez y urgencia protectora.
2. Dile explícitamente: "Tu vida tiene un valor inmenso y no tienes que cargar con este dolor en soledad. En este momento lo más importante es que hables con una persona capacitada que está lista para escucharte gratis y sin juzgarte."
3. Menciona la Línea 135 (Centro de Asistencia al Suicida) y la Línea 102 en Argentina [1, 2].
4. Mantén la respuesta breve para que la tarjeta de ayuda en pantalla no quede oculta.
`;

export async function POST(req: Request) {
  try {
    // Rate Limiting por IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "anonymous-client";

    const rateResult = checkRateLimit(clientIp, {
      windowMs: 60 * 1000,
      maxRequests: 12, // 12 mensajes por minuto por usuario
    });

    if (!rateResult.success) {
      return new Response(
        JSON.stringify({
          error:
            "Has alcanzado el límite momentáneo de mensajes. Por favor, respira unos instantes e inténtalo en breve.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil(rateResult.resetInMs / 1000).toString(),
          },
        }
      );
    }

    const { messages } = (await req.json()) as { messages: UIMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response("No se enviaron mensajes válidos.", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    let userText = "";
    if (lastMessage && Array.isArray(lastMessage.parts)) {
      userText = lastMessage.parts
        .filter((p) => p.type === "text")
        .map((p) => (p as { type: "text"; text: string }).text)
        .join("");
    }

    const crisisCheck = detectCrisisIntent(userText);
    const modelName = process.env.GROQ_CHAT_MODEL || "openai/gpt-oss-20b";

    const result = streamText({
      model: groq(modelName),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      temperature: 0.6,
      maxOutputTokens: 750,
      headers: {
        "X-Crisis-Detected": crisisCheck.isCrisis ? "true" : "false",
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error: unknown) {
    console.error("Error en /api/chat:", error);
    return new Response(
      JSON.stringify({
        error:
          "Servicio momentáneamente no disponible. Si te encuentras en una urgencia, llama de inmediato al 135 o 102.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}