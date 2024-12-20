import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

export function NewData(){
    const [status, setStatus] = useState<string | null>(null);
    const [rankings, setRanking] = useState<number[] | null>(null);

    async function submit(e: any) {
        e.preventDefault();
        const species = e.target[0].value;
        const name = e.target[1].value;
        const special_dish = e.target[2].value;
        const height = e.target[3].value;
        const salary = e.target[4].value;
        const ranking : number = parseInt(e.target[5].value);
        const job = e.target[6].value;

        console.log(rankings);

        if (!rankings!.includes(ranking)) {
            if (rankings) setRanking([...rankings, ranking])
            setStatus("Successfully added!");
            console.log("ez ni ez?");
            const response = await fetch('http://localhost:3000/rats', {
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
        } else{
            setStatus('Error: That rank already exists!')
        }
        
    }

    useEffect(() => {
        fetch('http://localhost:3000/rats/ranks').then(e => e.json()).then( e => setRanking(e.data)); 
    }, []);

    return(
        <>
            <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                <Form onSubmit={submit}>
                    <label htmlFor="sepcies">Species</label><br />
                    <input type="text" name="sepcies" id="sepcies" required /><br />

                    <label htmlFor="name">Name</label><br />
                    <input type="text" name="name" id="name" required /><br />

                    <label htmlFor="special_dish">Special Dish</label><br />
                    <input type="text" name="special_dish" id="special_dish" required /><br />

                    <label htmlFor="height">Height</label><br />
                    <input type="number" name="height" id="height" required min={0}/><br />

                    <label htmlFor="salary">Salary</label><br />
                    <input type="number" name="salary" id="salary" required min={0} /><br />

                    <label htmlFor="ranking">Ranking</label><br />
                    <input type="number" name="ranking" id="ranking" required min={0} /><br />

                    <label htmlFor="job">Job</label><br />
                    <input type="string" name="job" id="job" required /><br />

                    <Button variant="dark" type="submit" value="submit">
                        Submit
                    </Button>
                </Form>
                {status && (
                        <Alert variant={status.startsWith('Error') ? 'danger' : 'success'} className="mt-3">
                            {status}
                        </Alert>
                    )}
                </Col>
                </Row>
            </Container>
        </>
    )
}