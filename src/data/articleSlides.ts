interface Slide {
  title: string;
  content: string[];
  citations?: string[];
  leverPosition?: number; // 0-100 representing the Pringle maneuver state
}

export const articleSlides: Slide[] = [
  {
    title: "Abstract",
    content: [
      "The Pringle maneuver, a temporary occlusion of the hepatic pedicle during liver surgery, is a widely used technique for reducing blood loss during hepatic resection.",
      "While its effectiveness in hemorrhage control is well-documented, its potential effects on acid-base balance warrant careful examination.",
      "This review analyzes current evidence regarding the relationship between the Pringle maneuver and acid-base homeostasis."
    ],
    leverPosition: 0 // Normal state
  },
  {
    title: "Introduction",
    content: [
      "First described by J. Hogarth Pringle in 1908, the Pringle maneuver has become a standard technique in liver surgery.",
      "The procedure involves temporary occlusion of the hepatic pedicle (portal vein and hepatic artery) to control bleeding during hepatic procedures.",
      "Recent studies have suggested potential metabolic consequences of this temporary ischemia."
    ],
    citations: [
      "Pringle JH. Notes on the arrest of hepatic hemorrhage due to trauma. Ann Surg. 1908;48(4):541-549.",
      "Belghiti J, et al. Continuous versus intermittent portal triad clamping for liver resection: a controlled study. Ann Surg. 1999;229(3):369-375."
    ],
    leverPosition: 20 // Slight occlusion to demonstrate the concept
  },
  {
    title: "Impact on Lactate Metabolism",
    content: [
      "Research has demonstrated that the liver plays a central role in lactate clearance.",
      "Hepatic blood flow interruption affects lactate clearance",
      "Studies have shown increased lactate levels during the clamping period",
      "The degree of lactate elevation correlates with occlusion duration"
    ],
    citations: [
      "Jeppesen JB, et al. Lactate metabolism in chronic liver disease. Scand J Clin Lab Invest. 2013;73(4):293-299.",
      "Kretzschmar M, et al. Hepatic ischemia-reperfusion syndrome after partial liver resection. Exp Toxicol Pathol. 2003;54(5-6):423-431."
    ],
    leverPosition: 75 // Significant occlusion to show lactate accumulation
  },
  {
    title: "Ischemia-Reperfusion Effects",
    content: [
      "Clinical studies have documented several effects during and after hepatic pedicle clamping:",
      "Temporary hepatic ischemia occurs during clamping",
      "Cellular metabolic changes have been observed",
      "Reperfusion leads to the release of accumulated metabolites",
      "pH changes have been documented in clinical settings"
    ],
    citations: [
      "Kim YI, et al. The Pringle maneuver induces only partial ischemia of the liver. Hepatogastroenterology. 1995;42(2):169-171.",
      "Man K, et al. Prospective evaluation of Pringle maneuver in hepatectomy for liver tumors by a randomized study. Ann Surg. 1997;226(6):704-713."
    ],
    leverPosition: 100 // Full occlusion to demonstrate ischemia
  },
  {
    title: "Systemic Effects",
    content: [
      "Multiple studies have investigated the broader physiological impact:",
      "Changes in acid-base parameters during the procedure",
      "Potential compensatory mechanisms",
      "Variation in individual patient responses"
    ],
    citations: [
      "Clavien PA, et al. Protective effects of ischemic preconditioning for liver resection performed under inflow occlusion in humans. Ann Surg. 2000;232(2):155-162.",
      "Bismuth H, et al. Major hepatic resection under total vascular exclusion. Ann Surg. 1989;210(1):13-19."
    ],
    leverPosition: 50 // Moderate occlusion to show systemic adaptation
  },
  {
    title: "Clinical Considerations",
    content: [
      "Recent meta-analyses suggest:",
      "Intermittent clamping shows different metabolic effects compared to continuous clamping",
      "Optimal duration remains under investigation",
      "Individual patient factors influence tolerance"
    ],
    citations: [
      "Huguet C, et al. Liver ischemia for hepatic resection: where is the limit? Surgery. 1992;111(3):251-259.",
      "Wang HQ, et al. Hemihepatic versus total hepatic inflow occlusion during hepatectomy: a systematic review and meta-analysis. World J Gastroenterol. 2011;17(26):3158-3164."
    ],
    leverPosition: 30 // Lower occlusion to discuss clinical practice
  },
  {
    title: "Risk Stratification",
    content: [
      "Pre-existing liver function status",
      "Overall health status",
      "Surgical complexity",
      "Duration of procedure"
    ],
    leverPosition: 0 // Normal state
  },
  {
    title: "Monitoring Recommendations",
    content: [
      "Regular acid-base status assessment",
      "Lactate level monitoring",
      "Hemodynamic parameter tracking",
      "Individualized approach based on patient factors"
    ],
    leverPosition: 0 // Normal state
  },
  {
    title: "Management Strategies",
    content: [
      "Selective use of the Pringle maneuver",
      "Consideration of alternative techniques when appropriate",
      "Individualized approach to clamping duration",
      "Evidence-based monitoring protocols",
      "Early recognition of metabolic changes",
      "Appropriate intervention timing"
    ],
    leverPosition: 0 // Normal state
  },
  {
    title: "Conclusion",
    content: [
      "While the Pringle maneuver remains an important surgical technique, its effects on acid-base balance deserve careful consideration.",
      "More research is needed to fully understand the mechanisms and optimize management strategies."
    ],
    leverPosition: 0 // Normal state
  }
];
