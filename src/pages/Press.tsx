import { Header } from "../components/Header";

export default function Press() {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex-grow">
                <iframe
                    src="https://benmak9.craft.me/ceBlL4qWjopNuO"
                    className="w-full h-full border-0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
