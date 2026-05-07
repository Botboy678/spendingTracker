import type { Entry } from "../interfaces/Entry";
import GenericModal from "./GenericModal";
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react";
const BASE_URL = 'http://localhost:8080/api/v1/spendingTracker'

function ModalForm({ onClose }: { onClose: () => void }) {
    const { register, handleSubmit, formState: { errors } } = useForm<Entry>();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    function Toast({ message, onClose }: { message: string, onClose: () => void }) {
        return (
            <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">Notification</strong>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={onClose}
                    />
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
        )
    }
    const postEntry = async (entry: Entry) => {
        const response = await fetch(`${BASE_URL}/add`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
        });

        if (response.ok) {
            const message = await response.text();
            console.log(message);
            setShowToast(true);
            setToastMessage(message);
        }
        else if (response.status === 409) {
            const error = await response.text();
            console.log(error);
            setShowToast(true);
            setToastMessage(error);
        }
        else {
            console.log("Something Went Wrong! ", response.status)
        }
    }
    const onSubmit: SubmitHandler<Entry> = (data: Entry) => {
        postEntry(data);
        console.log(data);
    }
    return <>
        <GenericModal
            title="Add Entry"
            onClose={onClose}
            body={
                <>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-3">

                            {/* Date */}
                            <div className="col-12">
                                <div className="form-floating">
                                    <input
                                        {...register("date", {
                                            required: "Date is required",
                                            pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: "Date must be in YYYY-MM-DD format" }
                                        })}
                                        type="text"
                                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                        placeholder="YYYY-MM-DD"
                                        id="date"
                                    />
                                    <label htmlFor="date">📅 Date</label>
                                    {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                                </div>
                            </div>

                            {/* Money fields - 2 per row */}
                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("income", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.income ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="income"
                                    />
                                    <label htmlFor="income">💰 Income</label>
                                    {errors.income && <div className="invalid-feedback">{errors.income.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("coldCash", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.coldCash ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="coldCash"
                                    />
                                    <label htmlFor="coldCash">💵 Cold Cash</label>
                                    {errors.coldCash && <div className="invalid-feedback">{errors.coldCash.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("grocery", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.grocery ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="grocery"
                                    />
                                    <label htmlFor="grocery">🛒 Grocery</label>
                                    {errors.grocery && <div className="invalid-feedback">{errors.grocery.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("fastFood", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.fastFood ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="fastFood"
                                    />
                                    <label htmlFor="fastFood">🍔 Fast Food</label>
                                    {errors.fastFood && <div className="invalid-feedback">{errors.fastFood.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("bills", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.bills ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="bills"
                                    />
                                    <label htmlFor="bills">🧾 Bills</label>
                                    {errors.bills && <div className="invalid-feedback">{errors.bills.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("subscriptions", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.subscriptions ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="subscriptions"
                                    />
                                    <label htmlFor="subscriptions">📺 Subscriptions</label>
                                    {errors.subscriptions && <div className="invalid-feedback">{errors.subscriptions.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("gas", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.gas ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="gas"
                                    />
                                    <label htmlFor="gas">⛽ Gas</label>
                                    {errors.gas && <div className="invalid-feedback">{errors.gas.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("shopping", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.shopping ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="shopping"
                                    />
                                    <label htmlFor="shopping">🛍️ Shopping</label>
                                    {errors.shopping && <div className="invalid-feedback">{errors.shopping.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("miscellaneous", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.miscellaneous ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="miscellaneous"
                                    />
                                    <label htmlFor="miscellaneous">🎲 Miscellaneous</label>
                                    {errors.miscellaneous && <div className="invalid-feedback">{errors.miscellaneous.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("robinHoodTransfer", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.robinHoodTransfer ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="robinHoodTransfer"
                                    />
                                    <label htmlFor="robinHoodTransfer">📈 RobinHood Transfer</label>
                                    {errors.robinHoodTransfer && <div className="invalid-feedback">{errors.robinHoodTransfer.message}</div>}
                                </div>
                            </div>

                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        {...register("robinHood", { required: "Required", min: { value: 0, message: "Cannot be negative" }, valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        className={`form-control ${errors.robinHood ? 'is-invalid' : ''}`}
                                        placeholder="0.00"
                                        id="robinHood"
                                    />
                                    <label htmlFor="robinHood">🤖 RobinHood Balance</label>
                                    {errors.robinHood && <div className="invalid-feedback">{errors.robinHood.message}</div>}
                                </div>
                            </div>

                            <div className="col-12">
                                <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill">
                                    Add Entry
                                </button>
                            </div>

                        </div>
                    </form>
                </>
            }
        />
        {
            <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 9999 }}>
                {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
            </div>
        }
    </>
}
export default ModalForm;