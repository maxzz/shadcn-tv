import styles from "./sticky.module.css";
import { D1, D10, D2, D3, D4, D5, D6, D7, D8, D9 } from "./tables-data";

const cells = [D1, D2, D3, D4, D5, D6, D7, D8, D9, D10];

function Table1() { // NOTE: there should be a space inside tr children
    return (
        <>
            <section className={`${styles["sticky-header-row"]}`}>
                <h2 className="py-2">Sticky Header</h2>
                <div className={`${styles["container"]} w-fit h-52 overflow-auto`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cells.map((Cell, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <Cell />
                                    </tr>
                                ))
                            }
                            {/* <tr><td>1</td><D1 /></tr>
                            <tr><td>2</td><D2 /></tr>
                            <tr><td>3</td><D3 /></tr>
                            <tr><td>4</td><D4 /></tr>
                            <tr><td>5</td><D5 /></tr>
                            <tr><td>6</td><D6 /></tr>
                            <tr><td>7</td><D7 /></tr>
                            <tr><td>8</td><D8 /></tr>
                            <tr><td>9</td><D9 /></tr>
                            <tr><td>10</td><D10 /></tr> */}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

function Table2() {
    return (
        <>
            <section className={`${styles["sticky-first-column"]}`}>
                <h2 className="py-2">Sticky First Column</h2>
                <div className={`${styles["container"]} w-64 h-60 overflow-auto`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cells.slice(0, 5).map((Cell, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <Cell />
                                    </tr>
                                ))
                            }
                            {/* <tr><th scope="row">1</th><D1 /></tr>
                            <tr><th scope="row">2</th><D2 /></tr>
                            <tr><th scope="row">3</th><D3 /></tr>
                            <tr><th scope="row">4</th><D4 /></tr>
                            <tr><th scope="row">5</th><D5 /></tr> */}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

function Table3() {
    return (
        <>
            <section className={`${styles["sticky-header-and-first-column"]}`}>
                <h2 className="py-2">Sticky Header and First Column</h2>
                <div className={`${styles["container"]} w-64 h-60 overflow-auto`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cells.map((Cell, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <Cell />
                                    </tr>
                                ))
                            }
                            {/* <tr><th scope="row">1</th><D1 /></tr>
                            <tr><th scope="row">2</th><D2 /></tr>
                            <tr><th scope="row">3</th><D3 /></tr>
                            <tr><th scope="row">4</th><D4 /></tr>
                            <tr><th scope="row">5</th><D5 /></tr>
                            <tr><th scope="row">6</th><D6 /></tr>
                            <tr><th scope="row">7</th><D7 /></tr>
                            <tr><th scope="row">8</th><D8 /></tr>
                            <tr><th scope="row">9</th><D9 /></tr>
                            <tr><th scope="row">10</th><D10 /></tr> */}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export function TablesWithStyckyHeaderModules() {
    return (
        <div className="text-xs flex flex-wrap gap-4">
            <Table1 />
            <Table2 />
            <Table3 />
        </div>
    );
}
