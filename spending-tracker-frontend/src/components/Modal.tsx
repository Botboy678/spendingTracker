import { useEffect, useState } from "react";
import AssetSummary from "./AssetSummary";
import Table from "./Table";
import type { Entry } from "../interfaces/Entry";

const BASE_URL = 'http://localhost:8080/api/v1/spendingTracker'

function Modal({ onClose }: { onClose: () => void }) {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/all`);
            const entries = await response.json() as Entry[];
            setEntries(entries);
            setIsLoading(false);
        }
        fetchEntries();
    }, [])

    const titles = [
        "Date",
        "Income",
        "Start of Day Balance",
        "Cold Cash",
        "Grocery",
        "Fast Food",
        "Bills",
        "Subscriptions",
        "Gas",
        "Shopping",
        "Miscellaneous",
        "Robin Hood Transfer",
        "End of Day Balance",
        "Robin Hood",
        "Total Assets",
        "Percent Change"
    ];

    const lastEntry = entries[entries.length - 1];

    return <>
        <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Current Entries</h1>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <AssetSummary
                            totalAssets={lastEntry?.totalAssets}
                            endOfDayBal={lastEntry?.endOfDayBalance}
                            percentChange={lastEntry?.percentChange}
                            RobinHoodBal={lastEntry?.robinHood}
                            isLoading={isLoading} />
                        <Table titles={titles} entries={entries} />
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Modal;