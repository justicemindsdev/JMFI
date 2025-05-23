import { Header } from "../components/Header";

export default function Tcctv() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow">
                <iframe
                    src="/files/tcctv.html"
                    className="w-full h-full border-0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
