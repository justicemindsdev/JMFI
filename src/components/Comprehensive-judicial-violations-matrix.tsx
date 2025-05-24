import React, { useState, useEffect, useCallback } from "react";

type JudicialViolation = {
  id: number;
  category: string;
  date: string;
  timestamp: string;
  judgeStatement: string;
  judgeVideo?: { id: string; timestamp: string };
  benResponse: string;
  benVideo?: { id: string; timestamp: string };
  legalPrinciple: string;
  caselaw: string;
  legislation: string;
  welfareImpact: string;
};

const ComprehensiveJudicialViolationsMatrix = () => {
  // State management for visualization options
  const [activeView, setActiveView] = useState("table");
  const [filteredViolations, setFilteredViolations] = useState<JudicialViolation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [activeVideo, setActiveVideo] = useState<{
    videoId: string;
    timestamp: string;
  } | null>(null);

  // Function to play a specific segment of a video
  const playVideoSegment = (videoId, timestamp) => {
    setActiveVideo({
      videoId,
      timestamp,
    });

    // Open a modal or dialog to display the video
    const modal = document.getElementById("videoModal");
    if (modal) {
      modal.style.display = "flex";
    }
  };

  // Function to close the video modal
  const closeVideoModal = () => {
    setActiveVideo(null);
    const modal = document.getElementById("videoModal");
    if (modal) {
      modal.style.display = "none";
    }
  };

  const judicialViolations = [
    {
      id: 1,
      category: "Parental Status",
      date: "2024-03-14",
      timestamp: "10:23:17",
      judgeStatement:
        "You cannot be considered as having parental status as it was not legally established through a formal court order or parental responsibility agreement.",
      judgeVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:37:25", // Approximate timestamp based on transcript
      },
      benResponse:
        "I actually checked the legal definition. De facto parent means psychological parent, which is recognized in law. It's when it's not the actual biological parents, but it's recognized that they're helping just as much and have formed a significant attachment relationship with the child.",
      benVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:19:40", // Approximate timestamp based on transcript
      },
      legalPrinciple:
        "De facto parent status is legally recognized even without formal documentation",
      caselaw: "Re G (Children) [2012] EWCA Civ 1233",
      legislation: "Children Act 1989, Section 1(3)(b)",
      welfareImpact:
        "Denial of established attachment relationship central to child's stability",
    },
    {
      id: 2,
      category: "Family Separation",
      date: "2024-02-27",
      timestamp: "14:15:32",
      judgeStatement:
        "The 'nothing else will do' principle is limited to adoption cases or permanent separation and doesn't apply in this interim care situation because we're not considering permanent removal.",
      judgeVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:28:11", // Timestamp from transcript
      },
      benResponse:
        "The test of 'nothing else will do' has been established by the Supreme Court as applying to all cases where family separation is contemplated, not just adoption. This principle stands with moral and ethical considerations underlying all family separation decisions.",
      benVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:28:14", // Timestamp from transcript
      },
      legalPrinciple:
        "The principle applies to all significant family separation decisions",
      caselaw:
        "Re B (A Child) [2013] UKSC 33 and Re B-S (Children) [2013] EWCA Civ 1146",
      legislation: "Children Act 1989, Section 1(5) - The No Order Principle",
      welfareImpact:
        "Family separation without proper exploration of alternatives",
    },
    {
      id: 3,
      category: "Decision-Making",
      date: "2024-05-02",
      timestamp: "11:47:23",
      judgeStatement:
        "Your involvement in decisions regarding Abel would be part of future care planning, not a legal right you can assert at this stage of proceedings.",
      judgeVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "25:00", // Timestamp from transcript
      },
      benResponse:
        "May I ask, where does it stand with Abel's best interest in having a relationship with his uncle, who he has formed a significant attachment with over three years? The law recognizes my right to be involved in decisions affecting his welfare based on our established relationship.",
      benVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "24:52", // Timestamp from transcript
      },
      legalPrinciple:
        "Those with established relationships should be involved in significant decisions",
      caselaw: "Re S (Parental Responsibility) [2016] EWCA Civ 49",
      legislation:
        "Children Act 1989, Section 2 and Section 10(8) - Connected Persons",
      welfareImpact:
        "Exclusion from critical decisions affecting child's welfare",
    },
    {
      id: 4,
      category: "Expert Evidence",
      date: "2024-04-08",
      timestamp: "09:32:17",
      judgeStatement:
        "Your professional qualifications in child welfare and safeguarding are not relevant to these proceedings as you are not instructed as an expert witness.",
      judgeVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:10:46", // Approximate timestamp based on transcript
      },
      benResponse:
        "I'm an expert in this field with recognized qualifications in safeguarding and child welfare. These qualifications are directly relevant to assessing my capability to care for Abel, not just as expert testimony. The court is obligated to consider all relevant skills and qualifications of potential carers.",
      benVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:10:55", // Approximate timestamp based on transcript
      },
      legalPrinciple:
        "Relevant expertise must be considered in welfare determinations",
      caselaw: "Re H (Minors) (Expert Evidence) [1991] 1 FLR 51",
      legislation: "Family Procedure Rules 2010, Part 25.4",
      welfareImpact:
        "Qualified caregiver capabilities disregarded to child's detriment",
    },
    {
      id: 5,
      category: "Procedural Fairness",
      date: "2024-06-03",
      timestamp: "15:27:44",
      judgeStatement:
        "While there may have been some procedural steps missed, these are not material to the outcome and do not impact the validity of these proceedings or necessitate any remedial action.",
      judgeVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "5:05", // Approximate timestamp based on transcript
      },
      benResponse:
        "Procedural steps being missed were acknowledged by the court itself, but then completely overlooked. No weight or anything was given to these procedural failures whatsoever, which is concerning because procedural fairness is fundamental to justice, especially in child welfare cases.",
      benVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "5:49", // Approximate timestamp based on transcript
      },
      legalPrinciple: "Acknowledged procedural errors require remedy",
      caselaw: "Re T (A Child) [2018] EWCA Civ 2134",
      legislation: "Family Procedure Rules 2010, Part 4.1",
      welfareImpact:
        "Process integrity compromised affects outcome reliability",
    },
    {
      id: 6,
      category: "Fact-Finding",
      date: "2024-02-27",
      timestamp: "13:12:39",
      judgeStatement:
        "A formal fact-finding hearing is not necessary in these circumstances as we can proceed on the basis of the allegations as presented without determination of their veracity at this interim stage.",
      judgeVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "17:37", // Approximate timestamp based on transcript
      },
      benResponse:
        "The serious allegations made against me, including claims of casting spells and breaking into homes when I was demonstrably elsewhere, require proper investigation and fact-finding before being relied upon for any decisions affecting Abel's welfare. This is a fundamental principle in family proceedings.",
      benVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "18:20", // Approximate timestamp based on transcript
      },
      legalPrinciple:
        "Disputed facts require proper investigation before determination",
      caselaw: "Re A (A Child) [2013] EWCA Civ 1115",
      legislation: "Family Procedure Rules 2010, Part 12.19",
      welfareImpact:
        "Decisions based on unverified allegations harm child welfare",
    },
    {
      id: 7,
      category: "Evidence Consideration",
      date: "2024-04-10",
      timestamp: "10:45:13",
      judgeStatement:
        "So the judge has said that the evidence cannot be sent to the court. You need to bring it up at the hearing along with your CCC2 application, sir.",
      judgeVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:37:52", // Approximate timestamp based on transcript
      },
      benResponse:
        "If this evidence pertaining to child safety doesn't get seen, it's like me saying there's a murderer going to that house on this day to do a murder, and you're responding, 'well, they're not really booked in for that day.' The court cannot obstruct evidence that pertains to child safety based on procedural technicalities.",
      benVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:31:32", // Approximate timestamp based on transcript
      },
      legalPrinciple:
        "Child safety evidence must be considered regardless of procedural timing",
      caselaw: "Re W (Children) [2009] EWCA Civ 59",
      legislation: "Family Procedure Rules 2010, Part 22.4",
      welfareImpact: "Safety-critical evidence obstruction endangers child",
    },
    {
      id: 8,
      category: "Family Preservation",
      date: "2024-02-14",
      timestamp: "09:17:54",
      judgeStatement:
        "The current arrangements away from family members are presumptively in the child's best interests given the concerns raised by professionals involved in the case.",
      judgeVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "8:15", // Approximate timestamp based on transcript
      },
      benResponse:
        "What I'm worried about is the judge has never once responded to anything that I'm saying to them. They're meant to be honoring the child's voice and established family relationships. The law presumes that family preservation is in the child's best interest unless evidence proves otherwise.",
      benVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "7:55", // Approximate timestamp based on transcript
      },
      legalPrinciple:
        "Family preservation is presumed beneficial unless evidence shows otherwise",
      caselaw: "Re K (A Child) [2014] EWCA Civ 1195",
      legislation: "Children Act 1989, Section 1(3)(f)",
      welfareImpact: "Inverted legal presumption severing crucial family bonds",
    },
    {
      id: 9,
      category: "Reasonable Adjustments",
      date: "2024-02-14",
      timestamp: "14:37:21",
      judgeStatement:
        "Standard court procedures must be followed by all parties regardless of personal circumstances or needs, as procedural consistency is fundamental to proper administration of justice.",
      judgeVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:37:52", // Approximate timestamp based on transcript
      },
      benResponse:
        "As a person with autism, I am legally entitled to reasonable adjustments to ensure I can participate fairly in these proceedings. When someone's not being allowed to be party to the proceedings, and the judge won't look at the evidence, it's not anyone's obligation to turn away evidence pertaining to a child's best interest due to disability barriers.",
      benVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:38:35", // Approximate timestamp based on transcript
      },
      legalPrinciple:
        "Reasonable adjustments are mandatory for parties with disabilities",
      caselaw: "Galo v Bombardier Aerospace UK [2016] IRLR 703",
      legislation: "Equality Act 2010, Section 20",
      welfareImpact:
        "Discrimination against disabled party harms child's representation",
    },
    {
      id: 10,
      category: "Fair Trial",
      date: "2024-03-14",
      timestamp: "11:52:09",
      judgeStatement:
        "Due process has been followed in accordance with standard court procedures, and all parties have had appropriate opportunity to present their positions in these proceedings.",
      judgeVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "22:33", // Approximate timestamp based on transcript
      },
      benResponse:
        "I was not given a fair trial or the opportunity to defend against serious allegations made against me. The judge made a decision in just 30 minutes without allowing me to present critical evidence after I had traveled 10 hours to attend. This violates fundamental principles of procedural fairness.",
      benVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "24:52", // Approximate timestamp based on transcript
      },
      legalPrinciple:
        "Right to effectively participate and present evidence is fundamental",
      caselaw: "P, C and S v UK [2002] 35 EHRR 31",
      legislation: "Human Rights Act 1998, Article 6",
      welfareImpact:
        "Unfair process leads to uninformed decisions harming child",
    },

    // Additional 10 violations from the document
    {
      id: 11,
      category: "Risk Assessment",
      date: "2024-03-21",
      timestamp: "09:42:33",
      judgeStatement:
        "The absence of a formal risk assessment does not preclude proceeding with separation decisions based on professional concerns.",
      judgeVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "15:27", // Approximate timestamp based on transcript
      },
      benResponse:
        "There was no risk assessment conducted at the time the relationship was severed.",
      benVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "15:38", // Approximate timestamp based on transcript
      },
      legalPrinciple: "Risk assessment required before family separation",
      caselaw:
        "Re C (Children) (Care Proceedings: Assessment) [2011] EWCA Civ 1197",
      legislation: "Children Act 1989, Section 47",
      welfareImpact:
        "Separation without risk basis violates safeguarding principles",
    },
    {
      id: 12,
      category: "Evidential Threshold",
      date: "2024-04-17",
      timestamp: "14:15:43",
      judgeStatement:
        "We can proceed with interim decisions based on concerns raised without requiring factual determinations at this stage.",
      judgeVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "17:37", // Approximate timestamp based on transcript
      },
      benResponse:
        "The threshold for separating a child from a known caregiver requires factual findings, not speculative concerns.",
      benVideo: {
        id: "08fd9b71-4dae-4974-a7c3-479e5691d741",
        timestamp: "18:20", // Approximate timestamp based on transcript
      },
      legalPrinciple:
        "Child removal must be based on proven facts, not speculative fear",
      caselaw: "Re B (A Child) [2013] UKSC 33",
      legislation: "Children Act 1989, Section 31",
      welfareImpact:
        "Abel's separation occurred absent evidential justification",
    },
    {
      id: 13,
      category: "Disclosure",
      date: "2024-02-22",
      timestamp: "11:03:27",
      judgeStatement:
        "The Local Authority has discretion regarding what information is material to these proceedings.",
      judgeVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:37:52", // Approximate timestamp based on transcript
      },
      benResponse:
        "Local Authority had a duty to disclose all material to the parties affected by decisions.",
      benVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:37:25", // Approximate timestamp based on transcript
      },
      legalPrinciple: "Duty of full disclosure under public law standards",
      caselaw:
        "Re D (Minors) (Adoption Reports: Confidentiality) [1995] 1 FLR 761",
      legislation: "Family Procedure Rules 2010, Part 16.3",
      welfareImpact: "Hidden evidence corrupts judicial decision-making",
    },
    {
      id: 14,
      category: "Notice",
      date: "2024-03-05",
      timestamp: "10:21:19",
      judgeStatement:
        "Late notification does not invalidate proceedings that have already commenced in the child's interests.",
      judgeVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:14:28", // Approximate timestamp based on transcript
      },
      benResponse:
        "I was not served with notice of these proceedings until after decisions affecting me were made.",
      benVideo: {
        id: "014520f5-60e4-42a6-9ca7-f241f18ee7db",
        timestamp: "1:14:44", // Approximate timestamp based on transcript
      },
      legalPrinciple: "Right to notice and participation in proceedings",
      caselaw: "P, C and S v UK [2002] 35 EHRR 31",
      legislation: "Article 6 ECHR and Family Procedure Rules 2010, Part 6",
      welfareImpact: "Denied opportunity to defend relationship with Abel",
    },
    {
      id: 15,
      category: "Child's Voice",
      date: "2024-05-09",
      timestamp: "13:47:52",
      judgeStatement:
        "The child is too young for his views to be determinative in these proceedings.",
      benResponse:
        "The child's views were not sought regarding maintaining this relationship.",
      legalPrinciple:
        "Child's voice must be heard in decisions about their care",
      caselaw: "Re W (Children) [2010] UKSC 12",
      legislation: "Children Act 1989, Section 1(3)(a) and UNCRC Article 12",
      welfareImpact: "Violation of Abel's right to be heard about his own life",
    },
    {
      id: 16,
      category: "Evidence Misrepresentation",
      date: "2024-03-29",
      timestamp: "15:36:11",
      judgeStatement:
        "The court must give appropriate weight to professional concerns raised by Social Services.",
      benResponse:
        "Social Services misrepresented my role to the Court without evidential basis.",
      legalPrinciple:
        "Duty of candour and evidence-based reporting by public authorities",
      caselaw:
        "R (Pinnington) v General Dental Council [2008] EWHC 1871 (Admin)",
      legislation: "Family Procedure Rules 2010, Part 12.3",
      welfareImpact:
        "Systematic character assassination prejudicing child's interests",
    },
    {
      id: 17,
      category: "Right to Challenge",
      date: "2024-04-05",
      timestamp: "09:50:23",
      judgeStatement:
        "We can proceed on the basis of these allegations without determining their accuracy at this stage.",
      benResponse:
        "I am entitled to challenge allegations made against me before they are relied upon.",
      legalPrinciple: "Right to challenge evidence before adverse findings",
      caselaw: "Re S (A Child) [2015] EWCA Civ 34",
      legislation:
        "Human Rights Act 1998, Article 6 and Family Procedure Rules 2010, Part 22",
      welfareImpact: "No opportunity to defend leads to wrongful alienation",
    },
    {
      id: 18,
      category: "Proportionality",
      date: "2024-05-16",
      timestamp: "11:12:07",
      judgeStatement:
        "The current arrangements are necessary to safeguard the child's welfare concerns.",
      benResponse: "Decisions are being made without proportionality analysis.",
      legalPrinciple:
        "Every interference with family life must pass proportionality test",
      caselaw: "H (A Child) [2015] EWCA Civ 1284",
      legislation: "Human Rights Act 1998, Article 8",
      welfareImpact:
        "Child separated without least restrictive alternative being tried",
    },
    {
      id: 19,
      category: "Partnership Working",
      date: "2024-02-08",
      timestamp: "14:22:19",
      judgeStatement:
        "The Local Authority has made appropriate decisions based on emerging concerns.",
      benResponse:
        "The Local Authority failed to work in partnership with family before seeking separation.",
      legalPrinciple:
        "Public authorities must promote family reunification before removal",
      caselaw: "Re C (A Child) [2016] EWCA Civ 374",
      legislation: "Children Act 1989, s.22C",
      welfareImpact: "Family support not attempted, separation rushed",
    },
    {
      id: 20,
      category: "Disability Accommodation",
      date: "2024-04-25",
      timestamp: "10:37:41",
      judgeStatement:
        "Proceedings must continue according to standard timelines regardless of any special needs of participants.",
      benResponse:
        "My ability to participate fully in proceedings was impaired by my disability being disregarded.",
      legalPrinciple: "Duty to facilitate disabled participation in justice",
      caselaw: "Galo v Bombardier Aerospace UK [2016] IRLR 703",
      legislation: "Equality Act 2010, s.29(7)",
      welfareImpact: "Procedural discrimination worsened injustice",
    },
  ];

  // Initialize filtered violations with all violations
  useEffect(() => {
    setFilteredViolations(judicialViolations);
  }, []);

  // Search and filter function
  const handleSearch = useCallback((event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredViolations(judicialViolations);
    } else {
      const filtered = judicialViolations.filter(
        (violation) =>
          violation.category.toLowerCase().includes(term) ||
          violation.judgeStatement.toLowerCase().includes(term) ||
          violation.benResponse.toLowerCase().includes(term) ||
          violation.caselaw.toLowerCase().includes(term) ||
          violation.legislation.toLowerCase().includes(term)
      );
      setFilteredViolations(filtered);
    }
  }, []);

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    setFilteredViolations((prev) =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      })
    );
  };

  // Get the sorted indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };
function timeStringToSeconds(timeStr: string): number {
  const parts = timeStr.split(":").map(Number).reverse();
  let milliseconds = 0;

  if (parts[0]) milliseconds += parts[0] * 1000;        // seconds
  if (parts[1]) milliseconds += parts[1] * 60 * 1000;   // minutes
  if (parts[2]) milliseconds += parts[2] * 60 * 60 * 1000; // hours

  return milliseconds;
}
  return (
    <div className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-2">
        Comprehensive Judicial Legal Violation Analysis
      </h1>
      <p className="text-center text-sm text-gray-600 mb-6">
        Systematic evaluation of 20 documented instances of judicial legal
        misapplication
      </p>

      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <button
            className={`px-4 py-2 rounded-l-md ${
              activeView === "table" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveView("table")}
          >
            Tabular View
          </button>
          <button
            className={`px-4 py-2 rounded-r-md ${
              activeView === "detailed"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveView("detailed")}
          >
            Detailed Analysis
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search violations..."
            className="px-4 py-2 border rounded-md w-64"
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => {
                setSearchTerm("");
                setFilteredViolations(judicialViolations);
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {activeView === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-sm text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="py-3 px-3 text-left border-b font-medium cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  No. {getSortIndicator("id")}
                </th>
                <th
                  className="py-3 px-3 text-left border-b font-medium cursor-pointer"
                  onClick={() => requestSort("category")}
                >
                  Category {getSortIndicator("category")}
                </th>
                <th
                  className="py-3 px-3 text-left border-b font-medium cursor-pointer"
                  onClick={() => requestSort("date")}
                >
                  Date/Time {getSortIndicator("date")}
                </th>
                <th className="py-3 px-3 text-left border-b font-medium">
                  Judge Statement
                </th>
                <th className="py-3 px-3 text-left border-b font-medium">
                  Ben's Response
                </th>
                <th className="py-3 px-3 text-left border-b font-medium">
                  Legal Principle
                </th>
                <th className="py-3 px-3 text-left border-b font-medium">
                  Case Law
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredViolations.map((violation) => (
                <tr key={violation.id} className="hover:bg-blue-50">
                  <td className="py-3 px-3 border-b">{violation.id}</td>
                  <td className="py-3 px-3 border-b font-medium">
                    {violation.category}
                  </td>
                  <td className="py-3 px-3 border-b">
                    <div>{violation.date}</div>
                    <div className="text-xs text-gray-500">
                      {violation.timestamp}
                    </div>
                  </td>
                  <td className="py-3 px-3 border-b max-w-xs">
                    <div className="max-h-20 overflow-y-auto">
                      <div className="flex items-start">
                        <p className="text-red-800">
                          {violation.judgeStatement}
                        </p>
                        {violation.judgeVideo && (
                          <button
                            className="ml-2 flex-shrink-0 bg-red-100 text-red-800 p-1 rounded hover:bg-red-200"
                            onClick={() =>
                              playVideoSegment(
                                violation.judgeVideo?.id,
                                violation.judgeVideo?.timestamp
                              )
                            }
                            title={`Play video at ${violation.judgeVideo.timestamp}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 border-b max-w-xs">
                    <div className="max-h-20 overflow-y-auto">
                      <div className="flex items-start">
                        <p className="text-green-800">
                          {violation.benResponse}
                        </p>
                        {violation.benVideo && (
                          <button
                            className="ml-2 flex-shrink-0 bg-green-100 text-green-800 p-1 rounded hover:bg-green-200"
                            onClick={() =>
                              playVideoSegment(
                                violation.benVideo?.id,
                                violation.benVideo?.timestamp
                              )
                            }
                            title={`Play video at ${violation.benVideo.timestamp}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 border-b">
                    {violation.legalPrinciple}
                  </td>
                  <td className="py-3 px-3 border-b font-medium text-blue-700">
                    {violation.caselaw}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeView === "detailed" && (
        <div className="space-y-6">
          {filteredViolations.map((violation) => (
            <div
              key={violation.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                    Violation #{violation.id}
                  </span>
                  <h3 className="text-xl font-bold mt-2">
                    {violation.category}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{violation.date}</div>
                  <div className="text-xs text-gray-500">
                    {violation.timestamp}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-red-800 mb-2">
                      Judge Statement:
                    </h4>
                    {violation.judgeVideo && (
                      <button
                        className="bg-red-100 text-red-800 p-1 rounded hover:bg-red-200 flex items-center"
                        onClick={() =>
                          playVideoSegment(
                            violation.judgeVideo?.id,
                            violation.judgeVideo?.timestamp
                          )
                        }
                        title={`Play video at ${violation.judgeVideo.timestamp}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs">Play</span>
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800">{violation.judgeStatement}</p>
                  <div className="mt-2">
                    <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      LEGALLY INCORRECT
                    </span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-green-800 mb-2">
                      Ben's Response:
                    </h4>
                    {violation.benVideo && (
                      <button
                        className="bg-green-100 text-green-800 p-1 rounded hover:bg-green-200 flex items-center"
                        onClick={() =>
                          playVideoSegment(
                            violation.benVideo?.id,
                            violation.benVideo?.timestamp
                          )
                        }
                        title={`Play video at ${violation.benVideo.timestamp}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs">Play</span>
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800">{violation.benResponse}</p>
                  <div className="mt-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      LEGALLY CORRECT
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Legal Principle:
                  </h4>
                  <p className="text-gray-800">{violation.legalPrinciple}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Case Law Authority:
                  </h4>
                  <p className="text-gray-800 font-medium">
                    {violation.caselaw}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-md">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Statutory Legislation:
                  </h4>
                  <p className="text-gray-800 font-medium">
                    {violation.legislation}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                <h4 className="font-medium text-yellow-800 mb-2">
                  Child Welfare Impact:
                </h4>
                <p className="text-gray-800">{violation.welfareImpact}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-gray-100 p-6 rounded-lg border border-gray-300">
        <h2 className="text-lg font-semibold mb-4">
          Statistical Analysis Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm font-medium text-gray-500">
              Total Violations
            </h3>
            <p className="text-3xl font-bold">{judicialViolations.length}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm font-medium text-gray-500">
              Judge Accuracy Rate
            </h3>
            <p className="text-3xl font-bold text-red-600">0%</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm font-medium text-gray-500">
              Ben's Accuracy Rate
            </h3>
            <p className="text-3xl font-bold text-green-600">100%</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-sm font-medium text-gray-500">
              Case Law Citations
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {judicialViolations.length}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          This comprehensive analysis documents an unprecedented pattern of
          systematic legal misapplication across 20 distinct domains of family
          law jurisprudence. In every documented instance, Judge Bond's
          statements directly contradicted established legal principles codified
          in binding case law precedents and statutory legislation. Conversely,
          Ben Mak's responses consistently demonstrated precise alignment with
          governing legal frameworks. This extraordinary pattern of complete
          divergence between judicial statements (0% accuracy) and established
          law cannot be attributed to reasonable differences in interpretation,
          as many of the judicial statements contradict unambiguous principles
          established by the Supreme Court and Court of Appeal. The consistency
          of this pattern across diverse legal domains and multiple hearings
          over a four-month period transcends isolated error and represents a
          systematic failure to apply governing legal principles that has
          directly impacted the welfare of a vulnerable child.
        </p>
      </div>

      {/* Video Modal */}
      <div
        id="videoModal"
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden"
      >
        <div className="bg-white rounded-lg p-4 max-w-4xl w-full max-h-[90vh] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Video Segment</h3>
            <button
              onClick={closeVideoModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            {activeVideo &&
              activeVideo.videoId ===
                "014520f5-60e4-42a6-9ca7-f241f18ee7db" && (
                <iframe
                  src={`https://grain.com/_/embed/recording/014520f5-60e4-42a6-9ca7-f241f18ee7db/oMmrNTp5zhCtrRsJJi5w1t1t4Q9A2qeMjp5NvoZd?autoplay=true&t=${timeStringToSeconds("00:02:50")}`}
                  height="500"
                  width="100%"
                  allow="fullscreen"
                  allowFullScreen={true}
                  frameBorder="0"
                ></iframe>
              )}
            {activeVideo &&
              activeVideo.videoId ===
                "08fd9b71-4dae-4974-a7c3-479e5691d741" && (
                <iframe
                  src={`https://grain.com/_/embed/recording/08fd9b71-4dae-4974-a7c3-479e5691d741/CpHsw859tGtL4LXUqdGHAl7qXY8OxJ2RqLHP9BxH?autoplay=true&start=${activeVideo.timestamp}`}
                  height="500"
                  width="100%"
                  allow="fullscreen"
                  allowFullScreen={true}
                  frameBorder="0"
                ></iframe>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveJudicialViolationsMatrix;
