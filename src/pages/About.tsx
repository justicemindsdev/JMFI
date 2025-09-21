import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ExternalLink, FileText, Download } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Justice Minds</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Justice Minds is dedicated to advancing judicial accountability and transparency through 
            comprehensive analysis and advocacy. Our work focuses on systemic issues within the 
            justice system and promoting evidence-based reform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Ben Mak Comprehensive Assessment
              </CardTitle>
              <CardDescription>
                Complete Professional Credentials Assessment for Ben Mak - Judicial Assessment 2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                A comprehensive evaluation of professional credentials and judicial performance 
                metrics as part of our ongoing assessment framework.
              </p>
              <Button 
                onClick={() => {
                  // Note: The original file path was on local drive, so we'll provide a message
                  // about accessing the assessment
                  alert("This assessment is available through our internal documentation system. Please contact us for access.");
                }}
                variant="outline" 
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Assessment Details
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Source: Ben_Mak_Complete_Professional_Credentials_Assessment.html
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-green-600" />
                Judicial Benchmark Report
              </CardTitle>
              <CardDescription>
                Comprehensive benchmarking analysis of judicial performance standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                This report provides detailed benchmarks and performance metrics for judicial 
                evaluation, based on comprehensive data analysis and assessment frameworks.
              </p>
              <Button 
                onClick={() => {
                  window.open('https://tvecnfdqakrevzaeifpk.supabase.co/storage/v1/object/public/DashboardData/JUDICIAL%20BENCHMARK.pdf', '_blank');
                }}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Judicial Benchmark PDF
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Hosted on secure cloud storage
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Justice Minds operates at the intersection of legal analysis, data science, and 
                advocacy to promote transparency and accountability within the judicial system. 
                Our comprehensive assessments and benchmarking reports provide evidence-based 
                insights into judicial performance and systemic issues.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Through detailed professional credential assessments and performance benchmarking, 
                we work to ensure that judicial processes meet the highest standards of integrity 
                and effectiveness.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Areas of Focus:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Judicial performance assessment and benchmarking</li>
                <li>Professional credential evaluation and verification</li>
                <li>Systemic analysis of legal and administrative processes</li>
                <li>Evidence-based advocacy for judicial reform</li>
                <li>Transparency and accountability in legal proceedings</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
