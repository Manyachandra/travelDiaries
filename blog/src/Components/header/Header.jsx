import "./header.css";

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Travel & Explore !! The World</span>
                <span className="headerTitleLg">BLOG</span>
            </div>
            <img
                className="headerImg"
                src="adv.jpg"
                alt=""
            />
        </div>
    );
}