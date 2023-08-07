class fabricaDeAutos{
    static id = 0;
    nombre;
    autos;

    constructor(nombre) {
        this.nombre = nombre;
        this.autos = []
    }

    construir(ruedas, puertas, ventanas, radio, tipo, marca){
        const auto = {
            id: fabricaDeAutos.id,
            ruedas,
            puertas,
            ventanas,
            radio,
            tipo,
            marca,
        }

        this.autos.push(auto)
        fabricaDeAutos.id++;
        return auto;

    }


    getAutos() {
        return this.autos
    }
    
    

}

const fabrica = new fabricaDeAutos('Autitos tomi')
const Golcito = fabrica.construir(4, 2, 2, true, 'combustion', 'Wolkswagen')
const Palio = fabrica.construir(4, 4, 4, true,'electrico', 'Ford')
console.log(fabrica.getAutos())





