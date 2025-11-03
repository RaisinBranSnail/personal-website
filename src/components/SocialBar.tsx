'use client';

export default function SocialBar(){
  return (
    <div className="flex items-center justify-center space-x-6 py-8">
      {[
        { name: 'GitHub', url: 'https://github.com/RaisinBranSnail' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/brandon-grimaldo/' },
        { name: 'Email', url: 'mailto:BrandonGrimaldo16@gmail.com' },
      ].map((link) => (
        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer"
           className="group relative p-3 text-[var(--muted)] hover:text-[var(--accent)] transition-transform hover:scale-110"
           aria-label={`Visit ${link.name}`}>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--surface)] text-[var(--text)] px-2 py-1 rounded text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity border border-[var(--border)] whitespace-nowrap">
            {link.name}
          </span>
          <span className="font-mono">{link.name[0]}</span>
        </a>
      ))}
    </div>
  )
}
