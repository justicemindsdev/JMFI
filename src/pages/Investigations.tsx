import React from 'react';
import { Link } from 'wouter';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Investigations = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Active Investigations
          </h1>
          
          <div className="grid gap-6 md:gap-8">
            
            {/* Formal Complaint Submission & Evidence Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">
                Formal Complaint Submission & Evidence Summary
              </h2>
              <p className="text-blue-800 mb-4">
                Comprehensive disability discrimination case report and evidence documentation.
              </p>
              
              {/* Case Status Update */}
              <div className="bg-red-100 border border-red-300 rounded p-3 mb-4">
                <h3 className="text-sm font-semibold text-red-800 mb-2">URGENT CASE STATUS - ACTIVE CORRESPONDENCE</h3>
                <div className="text-xs text-red-700">
                  <p><strong>Google Workspace Case:</strong> #62373259</p>
                  <p><strong>Financial Ombudsman Ref:</strong> PNX-5731855-F6V8</p>
                  <p><strong>Domain:</strong> benmaklondon.com (Google Workspace Business Standard)</p>
                  <p><strong>Suspension Amount:</strong> £82.33 outstanding payment</p>
                  <p><strong>Legal Basis:</strong> Equality Act 2010 S20 & S21 - Reasonable Adjustments</p>
                  <p><strong>Payment Deadline:</strong> 3rd October 2025</p>
                  <p><strong>Current Status:</strong> Liability warning issued - Immediate escalation to compliance required</p>
                  <p><strong>Support Agent:</strong> George - Final warning regarding legal consequences delivered</p>
                </div>
              </div>

              {/* Live Correspondence Transcript - 24th September 2025 */}
              <div className="bg-gray-100 border border-gray-300 rounded p-3 mb-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">LIVE CORRESPONDENCE TRANSCRIPT - 24/09/2025</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>23:02 You:</strong> "Lets be clear you ignoring the section 20 and 21?"</p>
                  <p><strong>23:03 George:</strong> "Any legal arguments please refer to civil subpoenas link"</p>
                  <p><strong>23:05 You:</strong> "It's not a legal argument it's your duty to comply with your own policies"</p>
                  <p><strong>23:05 George:</strong> "Valid form of payment needed to avoid suspension"</p>
                  <p><strong>23:08 You:</strong> "Does Google have policies you must adhere to? Vulnerability flag on account?"</p>
                  <p><strong>23:10 George:</strong> "Root cause is payment, not valid form of payment"</p>
                  <p><strong>23:11 You:</strong> "This is materially incorrect - do not alter the narrative this is unlawful"</p>
                  <p><strong>23:12 George:</strong> "To reactivate please update card and clear balances"</p>
                  <p><strong>23:13 You:</strong> KNOCKOUT QUESTION 1 delivered</p>
                  <p><strong>23:17 George:</strong> "5 times lift provided past 90 days...final decision has come"</p>
                  <p><strong>23:18 You:</strong> KNOCKOUT QUESTION 2 delivered</p>
                  <p><strong>23:19 George:</strong> "System provided it 5 time...6th time cannot be done"</p>
                  <p><strong>23:20 You:</strong> KNOCKOUT QUESTION 3 delivered</p>
                  <p><strong>23:20 George:</strong> "Only way to reactivate is clear balance and update card"</p>
                </div>
              </div>

              {/* CRITICAL EVIDENCE - KNOCKOUT QUESTIONS DELIVERED */}
              <div className="bg-red-200 border border-red-400 rounded p-3 mb-4">
                <h4 className="text-sm font-semibold text-red-800 mb-2">CRITICAL EVIDENCE - KNOCKOUT QUESTIONS DELIVERED</h4>
                <div className="text-xs text-red-700 space-y-1">
                  <p><strong>QUESTION 1 RESPONSE:</strong> George acknowledged "Section 20 and 21 reasonable adjustment" but cited "system restrictions" for refusal</p>
                  <p><strong>QUESTION 2 RESPONSE:</strong> Confirmed payment preconditions: "clear balance and update the card" required for reasonable adjustments</p>
                  <p><strong>QUESTION 3 RESPONSE:</strong> "I'll be more than happy to give lift of suspension" but prioritised "administrative policy" over preventing discriminatory harm</p>
                  <p><strong>DISCRIMINATORY SYSTEM DEFENCE:</strong> "5 times lift of suspension provided...final decision has come...6th time cannot be done"</p>
                  <p><strong>VULNERABILITY FLAG IGNORED:</strong> Confirmed disability flag on account but continued to refuse reasonable adjustments</p>
                  <p><strong>LEGAL ASSESSMENT:</strong> Complete institutional liability established - no viable defence available to Google</p>
                </div>
              </div>

              {/* EVIDENCE TAMPERING - CIRCULAR DISCRIMINATION */}
              <div className="bg-purple-200 border border-purple-400 rounded p-3 mb-4">
                <h4 className="text-sm font-semibold text-purple-800 mb-2">🚨 EVIDENCE TAMPERING - CIRCULAR DISCRIMINATION</h4>
                <div className="text-xs text-purple-700 space-y-1">
                  <p><strong>GOOGLE'S PROMISE:</strong> "We will email a transcript of this chat to you" (System message 23:25)</p>
                  <p><strong>ACCESS BLOCKED:</strong> Cannot receive promised evidence due to email account lockout</p>
                  <p><strong>CIRCULAR HARM:</strong> Using original discrimination to prevent access to evidence of discrimination</p>
                  <p><strong>LEGAL BREACH:</strong> Evidence tampering + obstruction of justice + right to fair trial violations</p>
                  <p><strong>ADDITIONAL CLAIMS:</strong> Evidence obstruction (£15K-£25K) + Aggravated damages (£10K-£20K)</p>
                  <p><strong>TOTAL LIABILITY:</strong> Original case (£35K-£60K) + Evidence tampering = £60K-£105K potential award</p>
                </div>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href="/Assessments/2025-09-16%20Google%20Lock%20me%20out%20of%20account.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                    Google Account Lockout Evidence (PNG)
                  </a>
                  <a
                    href="/Assessments/google_fail_part_1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Additional Evidence Documentation (PDF)
                  </a>
                  <a
                    href="/Assessments/2025-09-16%20Google%20Lock%20me%20out%20of%20account.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Historical Chat Transcripts (PDF)
                  </a>
                </div>
              </div>

              {/* FORENSIC ANALYSIS - HISTORICAL EVIDENCE */}
              <div className="bg-orange-200 border border-orange-400 rounded p-3 mb-4">
                <h4 className="text-sm font-semibold text-orange-800 mb-2">🔍 FORENSIC ANALYSIS - HISTORICAL EVIDENCE REVEALS SYSTEMIC DISCRIMINATION</h4>
                <div className="text-xs text-orange-700 space-y-1">
                  <p><strong>ACCOUNT IDENTIFIED:</strong> "CONSULT@JUSTICE-MINDS.COM" - Professional legal services account</p>
                  <p><strong>HOUSING CRISIS DOCUMENTED:</strong> "WESTMINSTER HOUSING DOCUMENT" and "HOMELESSNESS" references in chat logs</p>
                  <p><strong>CASE TRACKING:</strong> "631061 - CONFIRMATION AND TRANSCRIPT FROM DOCTOR" - Formal disability documentation</p>
                  <p><strong>REPEATED REQUESTS:</strong> "PLEASE CONFIRM YOU READ THE OR TRANSCRIPT" - Pattern of demanding compliance</p>
                  <p><strong>EQUALITY ACT AWARENESS:</strong> "section 20 and 21 of the equality act reasonable adjustment" - Institutional knowledge confirmed</p>
                  <p><strong>AGENT INVOLVED:</strong> "Google Workspace Support, Manas" - Specific agent accountability</p>
                  <p><strong>SYSTEMATIC FAILURE:</strong> Multiple entries showing ongoing discrimination over extended period</p>
                  <p><strong>ESCALATED VULNERABILITY:</strong> Evidence of housing applications and safeguarding concerns documented by Google</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://disability-discrimination-case-report-197771841293.us-west1.run.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Full Report
                </a>
                <span className="text-sm text-blue-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  External Link - Opens in new tab
                </span>
              </div>
            </div>

            {/* Newlyn PLC Investigation */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-3">
                Newlyn PLC Investigation
              </h2>
              <p className="text-red-800 mb-4">
                Investigation into enforcement practices and compliance issues.
              </p>
              <Link
                href="/investigations/newlyn-plc"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Investigation
              </Link>
            </div>

            {/* Social Worker Engagement Investigation */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-900 mb-3">
                Social Worker Engagement Investigation
              </h2>
              <p className="text-yellow-800 mb-4">
                Investigation into social services engagement procedures and compliance.
              </p>
              <Link
                href="/investigations/social-worker-engagement"
                className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white font-medium rounded-md hover:bg-yellow-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Investigation
              </Link>
            </div>

            {/* Additional Resources */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Additional Resources
              </h2>
              <div className="space-y-2">
                <Link
                  href="/judge-errors-in-law"
                  className="block text-blue-600 hover:text-blue-800 underline"
                >
                  Judge Errors in Law Analysis
                </Link>
                <Link
                  href="/substantiation-fixed"
                  className="block text-blue-600 hover:text-blue-800 underline"
                >
                  Substantiation Documentation
                </Link>
                <Link
                  href="/tcctv"
                  className="block text-blue-600 hover:text-blue-800 underline"
                >
                  TCCTV Documentation
                </Link>
              </div>
            </div>

          </div>
          
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> All investigations are conducted in accordance with relevant legal standards 
              and regulatory requirements. External links open in new tabs for security purposes.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Investigations;
