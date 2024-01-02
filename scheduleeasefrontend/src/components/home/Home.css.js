// Home.css.js
const styles= {
    '*': {
        margin: 0, padding: 0, boxSizing: 'border-box',
    }
    ,
    body: {
        backgroundColor: 'white', color: 'green', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',
    }
    ,
    homeContainer: {
        textAlign: 'center',
    }
    ,
    h1: {
        fontSize: '40px', fontWeight: 600, marginBottom: '20px',
    }
    ,
    buttons: {
        display: 'flex', flexDirection: 'column', gap: '20px',
    }
    ,
    a: {
        textDecoration: 'none', cursor: 'pointer', fontSize: '20px', letterSpacing: '2px', border: '1px solid black', borderRadius: '50px', padding: '15px 20px', color: 'black', backgroundColor: 'greenyellow', transition: 'background-color 0.3s, color 0.3s',
    }
    ,
    aHover: {
        backgroundColor: 'green', color: '#0c1022',
    }
    ,
}

;
export default styles;