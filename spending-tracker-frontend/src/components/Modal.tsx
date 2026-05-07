import { useEffect, useState } from "react";
import AssetSummary from "./AssetSummary";
import Table from "./Table";
import type { Entry } from "../interfaces/Entry";

const BASE_URL = 'http://localhost:8080/api/v1/spendingTracker'

function Modal({ onClose }: { onClose: () => void }) {
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            const response = await fetch(`${BASE_URL}/all`)
            const entries = await response.json() as Entry[];
            setEntries(entries);
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

    return <>
        <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Current Entries</h1>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <AssetSummary totalAssets={0} endOfDayBal={0} percentChange={0}
                            RobinHoodBal={0} />
                        <Table titles={titles} entries={entries} />
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Modal;