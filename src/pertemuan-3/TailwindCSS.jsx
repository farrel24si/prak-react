export default function TailwindCSS() {
  return (
    // Menggunakan latar belakang 'Stone' yang hangat agar mata tidak lelah
    <div className="bg-[#FAF9F6] min-h-screen pb-32 font-serif text-zinc-900 selection:bg-blue-600 selection:text-white">
      <FlexboxGrid />

      {/* Kontainer Utama */}
      <div className="max-w-5xl mx-auto px-8">
        
        {/* Header: Permainan Kontras Tipografi */}
        <div className="mt-20 mb-24 relative">
          <span className="text-[10px] uppercase tracking-[0.6em] font-sans text-zinc-400 block mb-6 leading-none">
            Perspective / 004
          </span>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.85] uppercase italic transition-all duration-700 hover:not-italic">
            Belajar <br />
            <span className="text-blue-600 not-italic relative">
              Tailwind
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-zinc-900 scale-x-0 transition-transform duration-700 origin-right hover:scale-x-100"></span>
            </span>
          </h1>
        </div>

        {/* Action Buttons: Minimalist & Clean */}
        <div className="flex flex-wrap items-center gap-12 mb-32">
          <button className="group relative bg-zinc-900 text-white font-sans uppercase tracking-[0.3em] text-[9px] px-12 py-5 transition-all duration-500 hover:bg-blue-600">
            <span className="relative z-10">click me</span>
            <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
          <BorderRadius />
          <BorderRadius />
        </div>

        {/* Spacing Section: Grid Asimetris */}
        <section className="grid md:grid-cols-2 gap-20 mb-32">
          <Spacing title="Form & Void" content="Ruang kosong bukan berarti ketiadaan, melainkan sebuah struktur yang tak terlihat." />
          <div className="md:mt-24">
            <Spacing title="Visual Logic" content="Menyederhanakan kompleksitas kode menjadi harmoni visual yang intuitif." />
          </div>
        </section>

        {/* Typography & Effects Section */}
        <div className="space-y-40">
          <Typography />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <BackgroundColors />
            <ShadowEffects />
          </div>
        </div>
      </div>
    </div>
  )
}

function Spacing(props) {
  return (
    <div className="group border-t border-zinc-200 pt-10 transition-all duration-1000">
      <h2 className="text-4xl font-light italic mb-6 tracking-tight group-hover:pl-6 transition-all duration-500 border-l-0 group-hover:border-l-4 border-blue-600">
        {props.title}
      </h2>
      <p className="text-zinc-500 font-sans text-sm leading-loose tracking-wide max-w-sm">
        {props.content}
      </p>
    </div>
  )
}

function Typography() {
  return (
    <div className="relative py-32 border-y border-zinc-100 group overflow-hidden">
      <div className="absolute inset-0 bg-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.9,0,0.1,1)]"></div>
      <div className="relative z-10 text-center group-hover:text-white transition-colors duration-700">
        <h1 className="text-7xl md:text-[12rem] font-black uppercase tracking-tighter leading-none mix-blend-difference">
          Typo<span className="italic font-light">graphy</span>
        </h1>
        <p className="mt-8 font-sans text-[10px] tracking-[1em] uppercase opacity-40 group-hover:opacity-100">
          Curated Visual Language
        </p>
      </div>
    </div>
  )
}

function BorderRadius() {
  return (
    <button className="border-b border-zinc-900 m-2 text-zinc-900 font-sans uppercase tracking-[0.2em] text-[10px] px-2 py-1 hover:text-blue-600 hover:border-blue-600 transition-all duration-300"> 
        Klik Saya 
    </button>
  )
}

function BackgroundColors() {
  return (
    <div className="bg-blue-600 aspect-square rounded-[3rem] p-12 flex flex-col justify-end group hover:rounded-none transition-all duration-1000 ease-in-out cursor-pointer relative overflow-hidden shadow-2xl shadow-blue-900/20">
      <div className="absolute top-0 right-0 p-8 text-white/10 text-9xl font-black italic group-hover:scale-110 transition-transform duration-1000">01</div>
      <h3 className="text-4xl font-black text-white italic tracking-tighter relative z-10 group-hover:not-italic transition-all">Pure Blue</h3>
      <p className="mt-4 font-sans text-[10px] tracking-widest uppercase text-blue-100 relative z-10">Chromatic Study</p>
    </div>
  )
}

function FlexboxGrid() {
  return (
    <nav className="flex justify-between items-center px-12 py-10 sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md">
      <h1 className="text-2xl font-black tracking-tighter uppercase leading-none group cursor-pointer">
        A<span className="text-blue-600">.</span>Studio
      </h1>
      <ul className="hidden md:flex space-x-16 font-sans text-[9px] font-black uppercase tracking-[0.5em] text-zinc-400">
        <li><a href="#" className="hover:text-zinc-900 transition-colors relative group">Index<span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-900 group-hover:w-full transition-all"></span></a></li>
        <li><a href="#" className="hover:text-zinc-900 transition-colors relative group">Works<span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-900 group-hover:w-full transition-all"></span></a></li>
        <li><a href="#" className="hover:text-zinc-900 transition-colors relative group">Contact<span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-900 group-hover:w-full transition-all"></span></a></li>
      </ul>
      <div className="w-10 h-[1px] bg-zinc-900"></div>
    </nav>
  )
}

function ShadowEffects() {
  return (
    <div className="group border border-zinc-100 p-20 flex flex-col items-center justify-center text-center bg-white hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.08)] transition-all duration-1000 aspect-square">
      <h3 className="text-2xl font-light uppercase tracking-[0.4em] mb-4 group-hover:tracking-tight transition-all duration-700">Shadow</h3>
      <div className="w-8 h-[1px] bg-blue-600 mb-6 group-hover:w-20 transition-all duration-700"></div>
      <p className="text-zinc-400 font-sans text-[10px] leading-loose uppercase tracking-widest">
        Depth Perception
      </p>
    </div>
  )
}