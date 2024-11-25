import { useState } from "react";
import { Alert, Button, Col, Container } from "react-bootstrap";
import { Form } from "react-router";

export function NewData(){
    const [status, setStatus] = useState<string | null>(null);

    async function submit(e: any) {
        e.preventDefault();
        const species = e.target[0].value;
        const name = e.target[1].value;
        const special_dish = e.target[2].value;
        const height = e.target[3].value;
        const salary = e.target[4].value;
        const ranking = e.target[5].value;
        const job = e.target[6].value;

        const response = await fetch('https://localhost:3000/rats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                species,
                name,
                special_dish,
                height,
                salary,
                ranking,
                job
            }),
        });
        if (response.status === 201) {
            setStatus('New rat added!');
        } else {
            setStatus('Error: ' + (await response.text()));
        }
    }

    return(
        <>
           <main>
            <Container>
                <Form onSubmit={submit}>
                    <label htmlFor="sepcies">Species</label><br />
                    <input type="text" name="sepcies" id="sepcies" required /><br />

                    <label htmlFor="name">Name</label><br />
                    <input type="number" name="name" id="name" required /><br />

                    <label htmlFor="special_dish">Special Dish</label><br />
                    <input type="text" name="special_dish" id="special_dish" required /><br />

                    <label htmlFor="height">Height</label><br />
                    <input type="text" name="height" id="height" required min={0}/><br />

                    <label htmlFor="salary">Salary</label><br />
                    <input type="number" name="salary" id="salary" required min={0} /><br />

                    <label htmlFor="ranking">Ranking</label><br />
                    <input type="number" name="ranking" id="ranking" required min={0} /><br />

                    <label htmlFor="job">Job</label><br />
                    <input type="number" name="job" id="job" required /><br />

                    <Button variant="dark" type="submit" value="submit" />
                </Form>
                {status && (
                        <Alert variant={status.startsWith('Error') ? 'danger' : 'success'} className="mt-3">
                            {status}
                        </Alert>
                    )}
                </Container>
            </main>
        </>
    )
}