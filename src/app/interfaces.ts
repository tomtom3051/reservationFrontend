export interface iReservations {
    reservations?: iReservation[]
}

export interface iReservation {
    clientID: string,
    creationDate: Date,
    duration: number,
    id: number,
    modifDate: Date,
    reservationDate: Date,
    status: string,
    numberOfGuests: number,
    cleanUpCrew: boolean,
    barCrew: boolean,
    price: number
}

export interface iSearchRequest {
    startDate?:Date,
    endDate?: Date,
    clientID?:string,
    status?: string
}

export interface iPrice {
    priceType?: string,
    price?: number;
}