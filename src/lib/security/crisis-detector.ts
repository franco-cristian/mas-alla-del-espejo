const HIGH_RISK_PATTERNS = [
  // Ideación suicida directa o indirecta
  /\b(me quiero matar|quiero morir|quitarme la vida|no quiero vivir|suicidarme|acabar con todo|terminar con mi vida)\b/i,
  /\b(no vale la pena vivir|para qu[eé] seguir viviendo|dormir y no despertar|desaparecer para siempre)\b/i,
  // Autolesión activa
  /\b(me corto|cortarme las venas|lastimarme|hacerme da[ñn]o|tomarme pastillas para)\b/i,
  // Desesperación crítica
  /\b(ya no puedo m[aá]s con el dolor|nadie me va a extra[ñn]ar|mi vida no tiene sentido)\b/i,
];

export interface CrisisDetectionResult {
  isCrisis: boolean;
  matchedTrigger?: string;
  severity: "none" | "high";
}

export function detectCrisisIntent(text: string): CrisisDetectionResult {
  if (!text || typeof text !== "string") {
    return { isCrisis: false, severity: "none" };
  }

  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const pattern of HIGH_RISK_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        isCrisis: true,
        matchedTrigger: pattern.source,
        severity: "high",
      };
    }
  }

  return { isCrisis: false, severity: "none" };
}