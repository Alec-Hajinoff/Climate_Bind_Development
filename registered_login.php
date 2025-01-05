<!DOCTYPE html>
<html lang="en">

<head>
    <title>Climate Bind</title>
    <meta charset="UTF-8">
    <meta name="description" content="Climate Bind is an open-source, free-to-use peer-to-peer insurance web application offering insurance
        cover for damage to residential buildings caused by severe weather events.">
    <meta name="keywords" content="Climate, Insurance, Weather, Damage, Buildings">
    <meta name="author" content="Climate Bind Company">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="index.css">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>

</head>

<body>
    <div class="container text-center">
        <div class="row">
            <img id="logo" src="blue.svg" alt="A company logo" title="A company logo">
        </div>
        <div class="row-auto">
            <br>
        </div>
        <div class="row">
            <div class="col-12 col-md-8">
                <p>Climate Bind is an open-source, free-to-use peer-to-peer insurance web application offering
                    insurance cover for damage to residential buildings caused by severe weather events.</p>
            </div>
            <div class="col-12 col-md-4">
                <!--
                <p id="footer">New user? Please register:</p>
                <form class="row g-2" id="myFormRegister">
                    <div class="form-group">
                        <input autocomplete="off" type="text" pattern="[a-zA-Z ]+" class="form-control"
                            id="yourFirstName" name="name" required placeholder="Your first name">
                    </div>
                   
                    <div class="form-group">
                        <input autocomplete="off" type="number" pattern="[a-zA-Z ]+" class="form-control"
                            id="yourPremium" name="premium" required placeholder="Set monthly premium">
                    </div>
                    
                    <div class="form-group">
                        <input autocomplete="off" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            class="form-control" id="yourEmailRegister" name="email" required
                            placeholder="Email address">
                    </div>
                    <div class="form-group">
                        <input autocomplete="off" type="password" class="form-control" id="yourPasswordRegister"
                            name="password" required placeholder="Choose a strong password">
                    </div>
                    <div id="error-message" class="error"></div>
                    <button type="submit" class="btn btn-secondary" id="registerBtn">Register<span
                            class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                            id="spinnerRegister" style="display: none;"></span></button>
                    <div id="registerPlaceholder"></div>
                </form>
                -->
                <p id="footer">Thank you for registering! Your account is now set up, please log in:</p>
                <form class="row g-2" id="myFormLogin" method="POST" action="logged_in_account.php">
                    <div class="form-group">
                        <input autocomplete="off" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                            class="form-control" id="yourEmailLoginOne" name="email" required placeholder="Email address">
                    </div>
                    <div class="form-group">
                        <input autocomplete="off" type="password" class="form-control" id="yourPasswordLoginOne"
                            name="password" required placeholder="Password">
                    </div>
                    <div id="error-message-one" class="error"></div>
                    <button type="submit" class="btn btn-secondary" id="loginBtnOne">Login<span
                            class="spinner-border spinner-border-sm" role="status" aria-hidden="true" id="spinnerLogin"
                            style="display: none;"></span></button>
                    <div id="liveAlertPlaceholder"></div>
                </form>
            </div>
        </div>
        <br>
        <div class="row">
            <p id="footer"><em>Company address: 4 Bridge Gate, London, N21 2AH, United Kingdom. Email address:
                    <a href="mailto:team@climatebind.com">team@climatebind.com</a></em></p>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"></script>
    <script type="application/javascript" src="script.js"></script>
</body>

</html>