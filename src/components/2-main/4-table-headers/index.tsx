import "./table-headers.css"; //https://www.codewithshripal.com/playground/css/sticky-table-headers

function Table1() {
    return (
        <>
            <section className="sticky-header-row">
                <h2>Sticky Header</h2>
                <div className="container">
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
                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>john@example.com</td>
                                <td>Developer</td>
                                <td>USA</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jane Smith</td>
                                <td>jane@example.com</td>
                                <td>Manager</td>
                                <td>Canada</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Bob Johnson</td>
                                <td>bob@example.com</td>
                                <td>Designer</td>
                                <td>UK</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Alice Brown</td>
                                <td>alice@example.com</td>
                                <td>Analyst</td>
                                <td>Australia</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Mike Wilson</td>
                                <td>mike@example.com</td>
                                <td>Engineer</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Sara Davis</td>
                                <td>sara@example.com</td>
                                <td>Consultant</td>
                                <td>France</td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>David Lee</td>
                                <td>david@example.com</td>
                                <td>Coordinator</td>
                                <td>Japan</td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Linda Chen</td>
                                <td>linda@example.com</td>
                                <td>Tester</td>
                                <td>China</td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>Ryan Miller</td>
                                <td>ryan@example.com</td>
                                <td>Architect</td>
                                <td>Brazil</td>
                            </tr>
                            <tr>
                                <td>10</td>
                                <td>Emily White</td>
                                <td>emily@example.com</td>
                                <td>Administrator</td>
                                <td>India</td>
                            </tr>
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
            <section className="sticky-first-column">
                <h2>Sticky First Column</h2>
                <div className="container">
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
                            <tr>
                                <th scope="row">1</th>
                                <td>John Doe</td>
                                <td>john@example.com</td>
                                <td>Developer</td>
                                <td>USA</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jane Smith</td>
                                <td>jane@example.com</td>
                                <td>Manager</td>
                                <td>Canada</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Bob Johnson</td>
                                <td>bob@example.com</td>
                                <td>Designer</td>
                                <td>UK</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Alice Brown</td>
                                <td>alice@example.com</td>
                                <td>Analyst</td>
                                <td>Australia</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Mike Wilson</td>
                                <td>mike@example.com</td>
                                <td>Engineer</td>
                                <td>Germany</td>
                            </tr>
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
            <section className="sticky-header-and-first-column">
                <h2>Sticky Header and First Column</h2>
                <div className="container">
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
                            <tr>
                                <th scope="row">1</th>
                                <td>John Doe</td>
                                <td>john@example.com</td>
                                <td>Developer</td>
                                <td>USA</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jane Smith</td>
                                <td>jane@example.com</td>
                                <td>Manager</td>
                                <td>Canada</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Bob Johnson</td>
                                <td>bob@example.com</td>
                                <td>Designer</td>
                                <td>UK</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Alice Brown</td>
                                <td>alice@example.com</td>
                                <td>Analyst</td>
                                <td>Australia</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Mike Wilson</td>
                                <td>mike@example.com</td>
                                <td>Engineer</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <th scope="row">6</th>
                                <td>Sara Davis</td>
                                <td>sara@example.com</td>
                                <td>Consultant</td>
                                <td>France</td>
                            </tr>
                            <tr>
                                <th scope="row">7</th>
                                <td>David Lee</td>
                                <td>david@example.com</td>
                                <td>Coordinator</td>
                                <td>Japan</td>
                            </tr>
                            <tr>
                                <th scope="row">8</th>
                                <td>Linda Chen</td>
                                <td>linda@example.com</td>
                                <td>Tester</td>
                                <td>China</td>
                            </tr>
                            <tr>
                                <th scope="row">9</th>
                                <td>Ryan Miller</td>
                                <td>ryan@example.com</td>
                                <td>Architect</td>
                                <td>Brazil</td>
                            </tr>
                            <tr>
                                <th scope="row">10</th>
                                <td>Emily White</td>
                                <td>emily@example.com</td>
                                <td>Administrator</td>
                                <td>India</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export function TablesWithStyckyHeader() {
    return (
        <>
            <Table1 />
            <Table2 />
            <Table3 />
        </>
    );
}
