import Image from "next/image";
import BackHomeBtn from "../components/BackHomeBtn/BackHomeBtn";

export default function Custom404() {
    return (
        <div className="not-found">
            <Image src="/images/404.jpg" width={500} height={500} alt="404 - Page Not Found"/>
            <h1 style={{marginBottom: '40px'}}>404 - Page Not Found</h1>
            <BackHomeBtn/>
        </div>
    )
}