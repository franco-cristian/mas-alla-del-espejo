interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// Almacén en memoria para Edge/Node Runtime
const rateLimitMap = new Map<string, RateLimitRecord>();

interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimiterOptions = { windowMs: 60 * 1000, maxRequests: 12 }
): { success: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Limpieza periódica preventiva de entradas vencidas
  if (rateLimitMap.size > 10000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + options.windowMs,
    });
    return {
      success: true,
      remaining: options.maxRequests - 1,
      resetInMs: options.windowMs,
    };
  }

  if (record.count >= options.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetInMs: record.resetTime - now,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: options.maxRequests - record.count,
    resetInMs: record.resetTime - now,
  };
}