import {Box} from "lucide-react";
import Button from "./ui/Button";
import {useOutletContext} from "react-router";

const Navbar = () => {
    const { isSignedIn, username, signIn, signOut } = useOutletContext<AuthContext>()

    const handleAuthClick = async () => {
        if (isSignedIn) {
            try{
                await signOut()

            } catch (e) {
                console.error(`puter sign out failed: ${e}`)

            }
            return;
        }

        try {
            await signIn();

        } catch (e) {
            console.error(`puter sign in failed: ${e}`)

        }
    };
    return (
        <header className="navbar">
            <nav className={"inner"}>
                <div className={"left"}>
                    <div className={"brand"}>
                        <Box className={"logo"}/>
                        <span className={"name"}>
                            Meowify
                        </span>
                    </div>
                    <ul className={"links"}>
                        <a href={"#"}>Home</a>
                        <a href={"#"}>About us</a>
                        <a href={"#"}>Work</a>
                        <a href={"#"}>Contact</a>
                    </ul>
                </div>
                <div className={"actions"}>
                    {isSignedIn ? (
                        <>
                        <span className={"greeting"}>
                            {username ? `Hi, ${username}` : "Signed In"}
                        </span>

                            <Button size={"sm"} onClick={handleAuthClick} className={"btn"}>
                                Log Out
                            </Button>
                        </>
                        ):(
                        <>
                    <Button onClick={handleAuthClick} variant={"outline"} size={"sm"} className={"login"}>
                        Log In
                    </Button>
                        <a href={"#upload"} className={"cta"}>
                        Get Started
                        </a>
                        </> 
                    )}
                </div>
            </nav>
        </header>

    )
}
export default Navbar
