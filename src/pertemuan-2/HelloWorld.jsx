export default function HelloWorld(){
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }
    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>
            <GreetingBinjai/><br/>
            <GreetingBinjai/>
            <QuoteText/>
            <UserCard
            nama = "farrel"
            nim = "2457301052"
            tanggal = "2026/03/10"/>
            <UserCard
            nama = "kj"
            nim = "123"
            tanggal = "2026/03/10"/>
            <UserCard {...propsUserCard}/> 
        </div>
    )
}

function GreetingBinjai(){
    return (
        <small className="card">Salam dari binjai 🤣</small>
    )
}

function UserCard(props){
    return (
        <div className="card">
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </div>
    )
}

function QuoteText() {
    const text = "Mulutmu Harimaumu";
    const text2 = "Aku ingin jadi macan😘";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}