import { Container } from "@mantine/core";
import styles from './Landingpage.module.css';

const Landing = () => {
    return (
        <>
            <header class={styles.masthead}>
                <div class={styles.container}>
                    <div class={styles['mmasthead-subheading']}>Welcome to the homepage. Anyone can see this page!</div>
                    <div className={styles['masthead-heading'] + ' ' + styles['text-uppercase']}> Anyone can see this page!</div>
                </div>
            </header>
            <Container>

                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="description" content="" />
                    <meta name="author" content="" />
                    <title>Agency - Start Bootstrap Theme</title>

                    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />

                    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>

                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" type="text/css" />


                </head>
                <body id="page-top">


                    <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
                </body>
            </Container>
        </>
    );
};

export default Landing;
