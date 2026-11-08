export interface CrisisHotline {
  id: string;
  name: string;
  shortNumber: string;
  fullPhone: string;
  scope: "Nacional" | "Formosa";
  description: string;
  schedule: string;
  isFree: boolean;
  priority: number;
}

export const CRISIS_HOTLINES: CrisisHotline[] = [
  {
    id: "linea-135",
    name: "Centro de Asistencia al Suicida (CAS)",
    shortNumber: "135",
    fullPhone: "(011) 5275-1135",
    scope: "Nacional",
    description: "Atención anónima, gratuita y confidencial para personas en crisis o riesgo de suicidio.",
    schedule: "24 horas / 365 días",
    isFree: true,
    priority: 1,
  },
  {
    id: "linea-102",
    name: "Línea 102 - Niñez y Adolescencia",
    shortNumber: "102",
    fullPhone: "102",
    scope: "Nacional",
    description: "Espacio de escucha, asesoramiento y protección de derechos de chicas, chicos y jóvenes.",
    schedule: "24 horas, todos los días",
    isFree: true,
    priority: 2,
  },
  {
    id: "linea-141",
    name: "Línea 141 - SEDRONAR",
    shortNumber: "141",
    fullPhone: "0800 222 1141",
    scope: "Nacional",
    description: "Contención profesional y orientación en salud mental y situaciones de vulnerabilidad.",
    schedule: "24 horas, gratuita",
    isFree: true,
    priority: 3,
  },
  {
    id: "hospital-central-fsa",
    name: "Guardia Hospital Central de Formosa",
    shortNumber: "Hospital Central",
    fullPhone: "(0370) 442-6232",
    scope: "Formosa",
    description: "Atención médica y servicio de guardia psiquiátrica de urgencia.",
    schedule: "Guardia activa 24 horas",
    isFree: true,
    priority: 4,
  },
];