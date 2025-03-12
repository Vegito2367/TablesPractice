export default function TechStack() {
    const techs = [
        { name: "Next.js", logo: "/nextjs.png", link: "https://nextjs.org/" },
        { name: "React", logo: "/React.png", link: "https://react.dev/" },
        { name: "Tailwind CSS", logo: "/tailwind.jpeg", link: "https://tailwindcss.com/" },
        { name: "Supabase", logo: "/supabase.png", link: "https://supabase.com/" },
        { name: "Vercel", logo: "/vercel.svg", link: "https://vercel.com/"},
    ];

    return (
        <section className="py-12 bg-gray-900 text-center w-6/12 rounded-xl shadow-xl shadow-orange-300 hover:shadow-orange-500">
            <div className="flex flex-wrap justify-center gap-20">
                {techs.map((tech) => (
                    <a
                        key={tech.name}
                        href={tech.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center space-y-2 transform transition-all hover:scale-110"
                    >
                        <img src={tech.logo} alt={tech.name} className="h-8 lg:h-16" />
                        <span className="text-gray-300 text-sm lg:text-lg font-mono">{tech.name}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
