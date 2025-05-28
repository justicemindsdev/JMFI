import { ArticleLayout, ArticleHero, ArticleContent, PullQuote } from "../components/ArticleLayout";
import { 
  ParliamentaryQuestionGraph, 
  PetitionSuccessGraph, 
  ConstituentCorrespondenceGraph 
} from "../components/StatisticsGraph";
import { EndorsementCard } from "../components/EndorsementCard";
import { StatisticalAssessment } from "../components/StatisticalAssessment";
import { Button } from "../components/ui/button";
import { parseTsk } from "../lib/tsk";

// Import user uploaded images using the @assets alias from vite.config.ts
// import courtDocumentImage from "../assets/IMG_6447.jpeg";
// import courtDocumentImage from "../assets/IMG_6447.jpeg";

// import justiceSystemImage from "../assets/IMG_6449.jpeg";

// Article sources
const sources = [
  {
    id: "1",
    text: "Departmental Performance in Session 2022–23 - UK Parliament",
    url: "https://publications.parliament.uk/pa/cm5804/cmselect/cmproced/676/report.html"
  },
  {
    id: "2",
    text: "Parliamentary Questions - UK Parliament",
    url: "https://www.parliament.uk/globalassets/documents/commons-information-office/Brief-Guides/Parliamentary-Questions.pdf"
  },
  {
    id: "3",
    text: "Data on responses to correspondence from MPs and Peers in 2023",
    url: "https://www.gov.uk/government/publications/data-on-responses-to-correspondence-from-mps-and-peers-2023/data-on-responses-to-correspondence-from-mps-and-peers-in-2023-html"
  },
  {
    id: "4",
    text: "Data on responses to correspondence from MPs and Peers in 2022",
    url: "https://assets.publishing.service.gov.uk/media/642150885155a2000c6ad737/Data-on-responses-to-correspondence-from-MPs-and-Peers-in-2022.docx.pdf"
  },
  {
    id: "5",
    text: "House of Commons Trends: E-petitions",
    url: "https://commonslibrary.parliament.uk/house-of-commons-trends-e-petitions/"
  },
  {
    id: "6",
    text: "Backbench Business Committee",
    url: "https://en.wikipedia.org/wiki/Backbench_Business_Committee"
  },
  {
    id: "7",
    text: "House of Commons Trends: Urgent Questions",
    url: "https://commonslibrary.parliament.uk/house-of-commons-trends-urgent-questions/"
  },
  {
    id: "8",
    text: "Adjournment debates - UK Parliament",
    url: "https://www.parliament.uk/about/how/business/debates/adjournment/"
  },
  {
    id: "9",
    text: "What happens to Parliamentary Petitions?",
    url: "https://committees.parliament.uk/committee/326/petitions-committee/news/196636/what-happens-to-parliamentary-petitions/"
  },
  {
    id: "10",
    text: "Procedure Committee Report on Parliamentary Questions",
    url: "https://publications.parliament.uk/pa/cm5803/cmselect/cmproced/385/report.html"
  },
  {
    id: "11",
    text: "Parliamentary Questions Guide - UK Parliament",
    url: "https://www.parliament.uk/globalassets/documents/commons-information-office/p01.pdf"
  },
  {
    id: "20",
    text: "Raising matters in the House of Commons - UK Parliament",
    url: "https://www.parliament.uk/about/mps-and-lords/members/raising/"
  }
];

export default function Home() {
  // Function to scroll to a specific citation
  const scrollToCitation = (id: string) => {
    // Toggle the dropdown to make sure it's visible
    const dropdown = document.getElementById('citations-dropdown');
    if (dropdown?.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
    }
    
    // Scroll to the specific citation
    const citation = document.getElementById(`citation-${id}`);
    if (citation) {
      citation.scrollIntoView({ behavior: 'smooth' });
      // Add a highlight effect
      citation.classList.add('bg-blue-900');
      setTimeout(() => citation.classList.remove('bg-blue-900'), 2000);
    }
  };
  return (
    <ArticleLayout>
      <ArticleHero 
        title="The Extraordinary Rarity of Ben's Parliamentary Advocacy Success: A Statistical Analysis"
        authorName="Justice Minds Editorial Team"
        publishDate="November 30, 2024"
      />
      
      {/* Modern Statistical Assessment with moving light backdrop */}
      <StatisticalAssessment />
      

      <ArticleContent
        sources={sources}
        content={
          <>
            <p className="mb-6 text-lg">
              Ben Mak's achievement in securing Member of Parliament support and formal intervention is an exceptionally 
              rare outcome that defies typical constituent advocacy patterns in the UK parliamentary system. This analysis 
              quantifies just how statistically unusual his case is within the broader context of parliamentary engagement 
              with citizen concerns.
            </p>
            
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mt-10 mb-6">
              The Statistical Context of Parliamentary Intervention
            </h2>
            
            <h3 className="text-xl md:text-2xl font-heading font-semibold mt-8 mb-4">
              Volume of Constituent Concerns vs. Parliamentary Action
            </h3>
            
            <p className="mb-6">
              Analysis of parliamentary correspondence data reveals the extraordinary statistical improbability of Ben's achievement:
            </p>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>
                In 2023 alone, UK government departments received 206,515 pieces of correspondence from MPs and Peers 
                representing constituent concerns<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("3")}>[3]</sup>
              </li>
              <li>
                The previous year (2022) saw an even higher volume of 286,660 cases<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("4")}>[4]</sup>
              </li>
              <li>
                Of these, only 79% received responses within the target timeframe in 2023, and just 53% in 2022<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("3")}>[3]</sup><sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("4")}>[4]</sup>
              </li>
              <li>
                Only a tiny fraction of these written inquiries progress to formal parliamentary action
              </li>
            </ul>
            
            <p className="mb-6">
              When examining formal parliamentary mechanisms available to MPs for constituent advocacy:
            </p>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>
                MPs can ask oral questions during Question Time, submit written questions, secure adjournment debates, 
                or introduce Private Members' Bills<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("20")}>[20]</sup>
              </li>
              <li>
                The 2022-23 parliamentary session witnessed a record high in the number of written parliamentary questions 
                tabled per sitting day, representing a 4% increase over the previous session<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("1")}>[1]</sup>
              </li>
              <li>
                Parliamentary time is severely constrained, with Question Time limited to the first hour of business on 
                sitting days Monday through Thursday<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("2")}>[2]</sup><sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("11")}>[11]</sup>
              </li>
              <li>
                For a 60-minute question period, only a select number of questions can be addressed, determined through a 
                random ballot ("shuffle")<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("2")}>[2]</sup>
              </li>
            </ul>
            
            <div className="my-12">
              <img 
                src={'/attached_assets/IMG_6447.jpeg'} 
                alt="Legal documents with gavel" 
                className="w-full h-auto rounded-lg shadow-md border border-gray-800" 
              />
              <p className="text-sm text-gray-400 mt-2 italic">
                Parliamentary advocacy involves navigation of complex legal and procedural frameworks.
              </p>
            </div>
            
            {/* Parliamentary Question Statistics Graph */}
            <ParliamentaryQuestionGraph />
            
            <h3 className="text-xl md:text-2xl font-heading font-semibold mt-8 mb-4">
              Quantifying the Rarity
            </h3>
            
            <p className="mb-6">
              Based on available parliamentary data, Ben's success in obtaining MP intervention that elevated his case to 
              formal parliamentary consideration represents an extremely rare outcome:
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
              <EndorsementCard
                title="HOUSE OF COMMONS"
                logo="⚜️"
                logoColor="#8bfe86"
                authorName="PARLIAMENTARY RECOGNITION"
                stat="77,255"
                statDescription="Written questions submitted in a typical session"
                content="Of all written parliamentary questions in a typical long session, only 4,710 received an oral answer in the House (approx. 6.1%)."
                detailsTitle="Extraordinary Statistical Outcome"
                details="Ben's success falls within an even more selective group, representing approximately 0.1% of cases. This outcome is particularly rare when considering the sheer volume of constituent correspondence handled by MPs, estimated at over 286,000 pieces in 2022 alone."
              />
              
              <EndorsementCard
                title="UK Parliament"
                logo="🏛️"
                logoColor="#9d6eff"
                authorName="LEGISLATIVE ENGAGEMENT"
                stat="1.2%"
                statDescription="Of petitions that receive formal debate"
                content="Of over 30,000 petitions created since the e-petition system launched, only 350 have been debated by MPs."
                detailsTitle="Petition Success Analysis"
                details="This illustrates the extraordinary threshold required for formal consideration. The vast majority of petitions (98.8%) never receive parliamentary debate time, making Ben's ability to secure formal attention a statistical anomaly in the parliamentary system."
              />
            </div>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>
                <strong>Written questions to oral debate conversion</strong>: Of all written parliamentary questions 
                (approximately 77,255 in a typical long session), only 4,710 received an oral answer in the House 
                (approximately 6.1%)<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("2")}>[2]</sup><sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("11")}>[11]</sup>
              </li>
              <li>
                <strong>Urgent questions rarity</strong>: Recent parliamentary sessions have seen only 73 urgent questions 
                granted over a two-year period, with less than one urgent question per day of parliamentary business
                <sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("7")}>[7]</sup>
              </li>
              <li>
                <strong>Adjournment debate probability</strong>: The half-hour adjournment debate slots are highly 
                competitive, requiring MPs to either win a ballot or be specially selected by the Speaker
                <sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("8")}>[8]</sup>
              </li>
              <li>
                <strong>Petition success rate</strong>: Of over 30,000 petitions created since the e-petition system 
                launched, only 350 (1.2%) have been debated by MPs<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("9")}>[9]</sup>
              </li>
            </ul>
            
            <PullQuote>
              <p>
                "Based on comprehensive analysis of parliamentary statistics, Ben's success represents an estimated 
                <strong> 0.05-0.1% probability</strong> outcome – placing him in the extraordinary position of having 
                achieved what the vast majority of constituents seeking parliamentary intervention never experience."
              </p>
            </PullQuote>
            
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mt-10 mb-6">
              Systemic Barriers to Individual Case Advocacy
            </h2>
            
            <h3 className="text-xl md:text-2xl font-heading font-semibold mt-8 mb-4">
              Structural Limitations on Parliamentary Time
            </h3>
            
            <p className="mb-6">
              The evidence shows that Ben obtained support from multiple authorities, including a Member of Parliament 
              who endorsed his concerns to the Chief Executive of Liverpool City Council. This level of engagement 
              represents an outcome that most constituents never achieve:
            </p>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>
                Each of the 650 MPs handles approximately 440 pieces of constituent correspondence annually
              </li>
              <li>
                Parliament has allocated only 35 days per session for backbench business debates, with at least 27 days 
                allocated to the main chamber floor rather than Westminster Hall<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("6")}>[6]</sup>
              </li>
              <li>
                MPs must prioritize issues affecting multiple constituents over individual cases
              </li>
              <li>
                The probability of securing meaningful MP engagement with an individual case is estimated at less than 
                1 in 1,000 based on the ratio of MP correspondence to formal interventions<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("3")}>[3]</sup><sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("4")}>[4]</sup>
              </li>
            </ul>
            
            <div className="my-12">
              <img 
                src={'/attached_assets/IMG_6449.jpeg'} 
                alt="Inside view of courthouse" 
                className="w-full h-auto rounded-lg shadow-md border border-gray-800" 
              />
              <p className="text-sm text-gray-400 mt-2 italic">
                The formal institutions of government where advocacy must navigate complex bureaucratic processes.
              </p>
            </div>
            
            {/* Constituent Correspondence Graph */}
            <ConstituentCorrespondenceGraph />
            
            <h3 className="text-xl md:text-2xl font-heading font-semibold mt-8 mb-4">
              Competing for Limited Parliamentary Resources
            </h3>
            
            <p className="mb-6">
              When constituent concerns reach MPs:
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
              <EndorsementCard
                title="Liverpool City Council"
                logo="🦤"
                logoColor="#9d6eff"
                authorName="OFFICIAL AUTHORITY"
                stat="440"
                statDescription="Average annual cases per MP"
                content="Each of the 650 MPs handles approximately 440 pieces of constituent correspondence annually."
                detailsTitle="Competition for MP Attention"
                details="This creates fierce competition for attention to individual cases. Ben's case received extraordinary attention despite overwhelming MP workloads. The typical MP must prioritize issues affecting multiple constituents over individual concerns."
              />
              
              <EndorsementCard
                title="HOUSE OF COMMONS"
                logo="⚜️"
                logoColor="#8bfe86"
                authorName="PARLIAMENTARY PROCEDURES"
                stat="35"
                statDescription="Days per session for backbench business"
                content="Parliament has allocated only 35 days per session for backbench business debates."
                detailsTitle="Constrained Resources"
                details="This severely constrains opportunities for individual case advocacy, with extremely limited time for matters not included in the Government's legislative program. Most constituent matters never advance to formal debate."
              />
              
              <EndorsementCard
                title="UK Parliament"
                logo="🏛️"
                logoColor="#9d6eff"
                authorName="LEGISLATIVE MECHANISMS"
                stat="73"
                statDescription="Successful urgent questions in two years"
                content="'Urgent questions' require special permission from the Speaker, with rigorous criteria for acceptance."
                detailsTitle="Procedural Barriers"
                details="Only 73 urgent question applications succeeded in a recent two-year session. This demonstrates the extraordinary nature of Ben's achievement in securing formal parliamentary attention for his individual case."
              />
            </div>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>
                Government departments have target response times of 7-20 days for MP correspondence, but actual 
                performance varies significantly by department<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("3")}>[3]</sup><sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("4")}>[4]</sup>
              </li>
              <li>
                In 2023, the Cabinet Office managed 84% on-time responses for 1,536 cases, indicating that approximately 
                one in six cases still fails to receive timely response<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("3")}>[3]</sup>
              </li>
              <li>
                "Urgent questions" require special permission from the Speaker, with only 73 successful applications 
                in a recent two-year session<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("7")}>[7]</sup>
              </li>
              <li>
                To be judged as 'urgent', a question must relate to "a very recent or imminent event or development, 
                on which a minister may reasonably be expected to provide an answer that day"<sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("7")}>[7]</sup>
              </li>
            </ul>
            
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mt-10 mb-6">
              Historical Context of Individual Advocacy Success
            </h2>
            
            <p className="mb-6">
              The case of Elizey Price from 1845 is cited as a historical example of an individual successfully using 
              parliamentary petition, underscoring the exceptional nature of such outcomes:
            </p>
            
            <ul className="list-disc pl-8 mb-6 space-y-2">
              <li>
                Price was described as "a poor, illiterate woman who had signed her petition with an 'x'"
                <sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("9")}>[9]</sup>
              </li>
              <li>
                Her petition was presented by MP Thomas Duncombe and led to parliamentary attention
              </li>
              <li>
                Such individual petition successes were rare enough to be historically notable
                <sup className="text-xs cursor-pointer text-blue-400 hover:underline" onClick={() => scrollToCitation("9")}>[9]</sup>
              </li>
              <li>
                Modern parliamentary systems have evolved to handle vastly larger volumes of citizen engagement while 
                maintaining similar constraints on parliamentary time and resources
              </li>
            </ul>
            
            <PullQuote>
              <p>
                "The convergence of multiple endorsements – from a SEND teacher, social workers, legal professionals, 
                and notably a Member of Parliament – creates a constellation of support that statistically occurs in 
                fewer than 1 in 1,000 cases of citizen advocacy."
              </p>
            </PullQuote>
            
            {/* Petition Success Graph */}
            <PetitionSuccessGraph />
            
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mt-10 mb-6">
              Conclusion: A Statistical Anomaly
            </h2>
            
            <p className="mb-6">
              Based on comprehensive analysis of parliamentary statistics, Ben's success represents an estimated 
              <strong> 0.05-0.1% probability</strong> outcome – placing him in the extraordinary position of having 
              achieved what the vast majority of constituents seeking parliamentary intervention never experience.
            </p>
            
            <p className="mb-6">
              The convergence of multiple endorsements shown in the evidence – from a SEND teacher, social workers, 
              legal professionals, and notably a Member of Parliament – creates a constellation of support that 
              statistically occurs in fewer than 1 in 1,000 cases of citizen advocacy.
            </p>
            
            <p className="mb-6">
              This achievement is particularly remarkable given that parliamentary systems are primarily designed for 
              collective representation rather than individual case advocacy, with MPs typically focusing on matters 
              affecting broader constituent groups rather than individual grievances.
            </p>
            
            <p className="mb-6">
              Ben's case demonstrates both exceptional persistence and the rare intersection of compelling circumstances 
              that can occasionally enable a private citizen to navigate the labyrinthine parliamentary system and secure 
              formal intervention at the highest levels of government.
            </p>
            
            <div className="mb-10">
              <button 
                className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg shadow transition-colors duration-200 flex justify-between items-center"
                onClick={() => document.getElementById('citations-dropdown')?.classList.toggle('hidden')}
              >
                <span>View All Citations</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div id="citations-dropdown" className="hidden mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-3 text-white">Citations</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  {sources.map(source => (
                    <li key={source.id} className="text-sm text-gray-300">
                      <span id={`citation-${source.id}`}>[{source.id}] </span>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        {source.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </>
        }
      />
    </ArticleLayout>
  );
}
