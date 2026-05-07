interface props {
    cardTitle: string
    cardBody: number
}

function Card({ cardBody, cardTitle }: props) {
    return (
        <div className="card me-0 p-0">
            <div className="card-body p-2">
                <p className="card-title text-nowrap">{cardTitle}</p>
                {
                    cardTitle === "Percent Change" ?
                        <p className="card-text">{cardBody}%</p> :
                        <p className="card-text">${cardBody}</p>
                }
            </div>
        </div>
    )
}
export default Card