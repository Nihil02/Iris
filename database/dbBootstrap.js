const sqlite3 = require('sqlite3')

function createTables(db){

    db.exec(`        
        CREATE TABLE IF NOT EXISTS PACIENTE(
            CURP             VARCHAR(18) PRIMARY KEY,
            nombre           VARCHAR(50) NOT NULL,
            primer_apellido  VARCHAR(50) NOT NULL,
            segundo_apellido VARCHAR(50),
            fecnac           INTEGER(8) NOT NULL,
            edonac           VARCHAR(2) NOT NULL,
            sexo             TEXT CHECK(sexo IN ('M', 'H')) NOT NULL DEFAULT 'M',
            nacorigen        VARCHAR(4) NOT NULL,
            edo              VARCHAR(2) NOT NULL,
            mun              VARCHAR(3) NOT NULL,
            loc              VARCHAR(4) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS EMPLEADO(
            id               INTEGER PRIMARY KEY,
            nombre           TEXT NOT NULL,
            apellido1        TEXT NOT NULL,
            apellido2        TEXT,
            contraseña       TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS EXAMEN(
            cliente                 VARCHAR(18) NOT NULL,
            fecha                   TEXT NOT NULL,
            rx                      TEXT NOT NULL,
            lejos_od_esferico       TEXT NOT NULL,
            lejos_od_cilindrico     TEXT NOT NULL,
            lejos_od_eje            TEXT NOT NULL,
            lejos_od_agudeza_visual TEXT NOT NULL,
            lejos_oi_esferico       TEXT NOT NULL,
            lejos_oi_cilindrico     TEXT NOT NULL,
            lejos_oi_eje            TEXT NOT NULL,
            lejos_oi_agudeza_visual TEXT NOT NULL,
            adicion_od_esferico     TEXT NOT NULL,
            adicion_oi_esferico     TEXT NOT NULL,
            tipo_lentes             TEXT NOT NULL,
            observaciones           TEXT NOT NULL,
            
            FOREIGN KEY (cliente) REFERENCES EMPLEADO(CURP)
        );

        CREATE TABLE IF NOT EXISTS PROOVEDOR(
            rfc              TEXT PRIMARY KEY,
            razon_social     TEXT NOT NULL,
            domicilio        TEXT NOT NULL,
            telefono         TEXT NOT NULL,
            cuenta_bancaria  TEXT NOT NULL
        );
    `, (err) => {
        if(err != null){
            console.log(err)
        }
    })
}

module.exports = {
    create: ()=>{
        let db = new sqlite3.Database('./database/iris.db', (err)=>{
            if(err != null) {
                console.log(`Error: ${err}`)
            }
        })
        createTables(db)
    }
}
