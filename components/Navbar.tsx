import {Box, Menu, X} from "lucide-react";
import Button from "./ui/Button";
import {useOutletContext} from "react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
    const { isSignedIn, username, signIn, signOut, isLoading } = useOutletContext<AuthContext>()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="navbar">
            <nav className={"inner"}>
                <div className={"left"}>
                    <div className={"brand"} onClick={() => window.location.href='#hero'}>
                        <Box className={"logo"}/>
                        <span className={"name"}>
                            Meowify
                        </span>
                    </div>
                    <ul className={"links"}>
                        <a href={"#hero"}>Home</a>
                        <a href={"#about"}>About us</a>
                        <a href={"#"}>Work</a>
                        <a href={"#"}>Contact</a>
                    </ul>
                </div>
                <div className={"actions"}>
                    <div className="hidden lg:flex items-center space-x-4 md:space-x-6">
                        {isLoading ? (
                            <div className="w-24 h-9 bg-zinc-100 animate-pulse rounded-xl" />
                        ) : isSignedIn ? (
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
                    
                    {/* Hamburger Button */}
                    <button 
                        className="lg:hidden p-2 text-foreground hover:bg-zinc-100 rounded-xl transition-all active:scale-95 border-[3px] border-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                        onClick={toggleMenu}
                    >
                        {isMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white border-[3px] border-foreground rounded-[2rem] p-6 shadow-handdrawn z-50 overflow-hidden"
                    >
                        <ul className="flex flex-col space-y-4 mb-8">
                            <a href={"#hero"} className="text-lg font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>Home</a>
                            <a href={"#about"} className="text-lg font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>About us</a>
                            <a href="#" className="text-lg font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>Work</a>
                            <a href="#" className="text-lg font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>Contact</a>
                        </ul>
                        <div className="flex flex-col space-y-4 pt-6 border-t-[3px] border-zinc-100">
                            {isLoading ? (
                                <div className="w-full h-12 bg-zinc-100 animate-pulse rounded-xl" />
                            ) : isSignedIn ? (
                                <>
                                    <span className="text-center text-sm font-bold uppercase tracking-widest text-foreground/70 mb-2">
                                        {username ? `Hi, ${username}` : "Signed In"}
                                    </span>
                                    <Button fullWidth size="lg" onClick={() => { handleAuthClick(); toggleMenu(); }}>
                                        Log Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button fullWidth onClick={() => { handleAuthClick(); toggleMenu(); }} variant="outline" size="lg">
                                        Log In
                                    </Button>
                                    <a href={"#upload"} className="cta text-center px-6 py-4 text-lg bg-primary text-white border-[3px] border-foreground shadow-handdrawn rounded-2xl active:translate-x-1 active:translate-y-1 active:shadow-none" onClick={toggleMenu}>
                                        Get Started
                                    </a>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>

    )
}
export default Navbar;
