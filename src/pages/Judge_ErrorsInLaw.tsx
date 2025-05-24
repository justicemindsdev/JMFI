import ComprehensiveJudicialViolationsMatrix from "../components/Comprehensive-judicial-violations-matrix";
import { Header } from "../components/Header";

export default function Press() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow">
                {/* <iframe
                    src="https://officalofficer.vercel.app/judicial-violations-matrix.html"
                    className="w-full h-full border-0"
                    allowFullScreen
                ></iframe> */}
                <ComprehensiveJudicialViolationsMatrix />
            </div>
        </div>
    );
}
