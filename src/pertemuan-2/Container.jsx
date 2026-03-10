export default function Container({children}){
    return(
        <div>
            <h1>Pemrograman Framework Lanjutan</h1>
            <br/>
            <img src="img/cp.jpg" width="100%"/>
                {children} 
            <br/>
            <footer>
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    )
}