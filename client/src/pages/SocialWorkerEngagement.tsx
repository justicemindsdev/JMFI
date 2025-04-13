import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  FileText, 
  Clock, 
  Calendar, 
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart
} from "lucide-react";

export default function SocialWorkerEngagement() {
  const [showResources, setShowResources] = useState(false);
  
  useEffect(() => {
    // Animate in resources after a delay
    const timer = setTimeout(() => {
      setShowResources(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-200">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-white">
              Social Worker Engagement
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Interactive resources and guidelines for effective engagement with social services
            </p>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <Card className="p-6 bg-gray-900 border-gray-800">
                <h2 className="text-2xl font-heading font-semibold mb-4 text-white">Understanding Social Worker Engagement</h2>
                <p className="text-gray-300 mb-4">
                  Effective communication with social workers is critical for advocating for vulnerable
                  individuals. This interactive resource provides guidance on engaging with social
                  services departments, understanding your rights, and ensuring appropriate support.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-800 p-5 rounded-lg flex flex-col">
                    <div className="flex items-center mb-3">
                      <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                      <h3 className="font-medium text-lg">Best Practices</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Document all interactions, maintain records, and establish clear communication channels.</p>
                    <Button variant="outline" size="sm" className="mt-auto self-start">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="bg-gray-800 p-5 rounded-lg flex flex-col">
                    <div className="flex items-center mb-3">
                      <XCircle className="text-red-500 mr-2 h-5 w-5" />
                      <h3 className="font-medium text-lg">Common Pitfalls</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Missing appointments, lack of documentation, and failing to follow up on agreements.</p>
                    <Button variant="outline" size="sm" className="mt-auto self-start">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card className="bg-gray-900 border-gray-800 p-5 hover:bg-gray-800 transition-colors">
                  <FileText className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="font-heading font-medium text-lg mb-2">Documentation Guide</h3>
                  <p className="text-gray-400 text-sm">Templates and checklists for proper record-keeping</p>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800 p-5 hover:bg-gray-800 transition-colors">
                  <Calendar className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="font-heading font-medium text-lg mb-2">Meeting Preparation</h3>
                  <p className="text-gray-400 text-sm">How to prepare for assessments and case conferences</p>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800 p-5 hover:bg-gray-800 transition-colors">
                  <MessageSquare className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="font-heading font-medium text-lg mb-2">Communication Tips</h3>
                  <p className="text-gray-400 text-sm">Effective strategies for clear communication</p>
                </Card>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-6 mt-8">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-medium text-lg mb-2">Important Note</h3>
                    <p className="text-gray-300 text-sm">
                      This resource provides general guidance but does not substitute for legal advice.
                      Each social services department operates slightly differently, and policies may
                      vary by locality. Always consult with an advocate or legal professional when needed.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <Card className="p-6 bg-gray-900 border-gray-800">
                <h2 className="text-2xl font-heading font-semibold mb-6 text-white">Interactive Resources</h2>
                
                <div className={`grid md:grid-cols-2 gap-6 transition-opacity duration-500 ${showResources ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/60">
                    <h3 className="font-medium text-lg mb-3 flex items-center">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      Templates & Forms
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between items-center p-2 hover:bg-gray-800 rounded">
                        <span>Communication Log Template</span>
                        <Button variant="ghost" size="sm">Download</Button>
                      </li>
                      <li className="flex justify-between items-center p-2 hover:bg-gray-800 rounded">
                        <span>Meeting Request Letter</span>
                        <Button variant="ghost" size="sm">Download</Button>
                      </li>
                      <li className="flex justify-between items-center p-2 hover:bg-gray-800 rounded">
                        <span>Assessment Checklist</span>
                        <Button variant="ghost" size="sm">Download</Button>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-800 rounded-lg p-4 bg-gray-900/60">
                    <h3 className="font-medium text-lg mb-3 flex items-center">
                      <Clock className="h-5 w-5 text-blue-500 mr-2" />
                      Timeline Guide
                    </h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex justify-between items-center p-2 hover:bg-gray-800 rounded">
                        <span>Assessment Timelines</span>
                        <Button variant="ghost" size="sm">View</Button>
                      </li>
                      <li className="flex justify-between items-center p-2 hover:bg-gray-800 rounded">
                        <span>Response Expectations</span>
                        <Button variant="ghost" size="sm">View</Button>
                      </li>
                      <li className="flex justify-between items-center p-2 hover:bg-gray-800 rounded">
                        <span>Appeals Process</span>
                        <Button variant="ghost" size="sm">View</Button>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className={`mt-8 transition-opacity duration-500 delay-200 ${showResources ? 'opacity-100' : 'opacity-0'}`}>
                  <h3 className="font-medium text-lg mb-4 flex items-center">
                    <BarChart className="h-5 w-5 text-blue-500 mr-2" />
                    Service Quality Metrics
                  </h3>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Response Time</span>
                          <span>62%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Case Resolution</span>
                          <span>48%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Client Satisfaction</span>
                          <span>36%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '36%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-xs mt-4">
                      Data based on anonymized surveys with 250 respondents across various local authorities
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Case Studies Tab */}
            <TabsContent value="case-studies" className="space-y-6">
              <Card className="p-6 bg-gray-900 border-gray-800">
                <h2 className="text-2xl font-heading font-semibold mb-6 text-white">Real-World Examples</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-blue-900/30 p-4">
                      <h3 className="font-medium text-lg">Case Study #1: Care Assessment Delays</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 mb-4">
                        Client experienced significant delays in needs assessment, resulting in inadequate
                        care provisions. Through documented communication and formal complaints procedure,
                        the assessment was expedited.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">Assessment</span>
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">Care Needs</span>
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">Complaints</span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        Full Case Study
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-800 rounded-lg overflow-hidden">
                    <div className="bg-blue-900/30 p-4">
                      <h3 className="font-medium text-lg">Case Study #2: Support Plan Implementation</h3>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-300 mb-4">
                        Client's agreed support plan was not being fully implemented. Regular monitoring
                        and documentation of service delivery, coupled with effective engagement with
                        social services management, resolved the implementation gaps.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">Support Plan</span>
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">Monitoring</span>
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">Management</span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        Full Case Study
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}