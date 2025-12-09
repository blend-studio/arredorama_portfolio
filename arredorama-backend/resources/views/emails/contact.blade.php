<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nuova Richiesta - Arredorama</title>
    <style>
        /* Reset base */
        body, table, td, p, a, h1, h2, h3, span, div {
            font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        
        /* Colori */
        .bg-dark { background-color: #1a1a1a !important; }
        .bg-white { background-color: #ffffff !important; }
        .bg-gray { background-color: #f5f5f5 !important; }
        .bg-light-gray { background-color: #fafafa !important; }
        .bg-accent { background-color: #ff5149 !important; }
        
        .text-dark { color: #1a1a1a !important; }
        .text-white { color: #ffffff !important; }
        .text-accent { color: #ff5149 !important; }
        .text-gray { color: #888888 !important; }
        .text-muted { color: #999999 !important; }
        .text-light { color: #cccccc !important; }
        
        /* Typography */
        .heading-lg { font-size: 28px; font-weight: 300; letter-spacing: 4px; }
        .heading-md { font-size: 24px; font-weight: 600; }
        .text-sm { font-size: 14px; }
        .text-xs { font-size: 12px; }
        .text-xxs { font-size: 11px; }
        .text-body { font-size: 15px; line-height: 1.8; }
        .text-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold; }
        
        /* Buttons */
        .btn-primary {
            display: inline-block;
            background-color: #1a1a1a;
            color: #ffffff !important;
            font-size: 12px;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 4px;
        }
        .btn-primary:hover { background-color: #ff5149; }
        
        /* Badge */
        .badge {
            display: inline-block;
            background-color: #ff5149;
            color: #fff;
            font-size: 10px;
            font-weight: bold;
            letter-spacing: 2px;
            padding: 6px 12px;
            border-radius: 3px;
            text-transform: uppercase;
        }
        
        /* Borders */
        .border-bottom { border-bottom: 1px solid #f0f0f0; }
        .border-left-accent { border-left: 4px solid #ff5149; }
        
        /* Links */
        a.link-accent { color: #ff5149; text-decoration: none; }
        a.link-dark { color: #1a1a1a; text-decoration: none; }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content-padding { padding: 30px 25px !important; }
            .hide-mobile { display: none !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Arial, sans-serif;">
    
    <!-- Container principale -->
    <table width="100%" cellpadding="0" cellspacing="0" class="bg-gray" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                
                <!-- Card Email -->
                <table width="600" cellpadding="0" cellspacing="0" class="container bg-white" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
                    
                    <!-- Header -->
                    <tr>
                        <td class="bg-dark content-padding" style="background-color: #1a1a1a; padding: 40px 50px; text-align: center;">
                            <h1 class="heading-lg text-white" style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 300; letter-spacing: 4px;">ARREDORAMA</h1>
                            <p class="text-accent text-xxs" style="margin: 8px 0 0 0; color: #ff5149; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Il Grande Spazio delle Idee</p>
                        </td>
                    </tr>
                    
                    <!-- Titolo -->
                    <tr>
                        <td class="content-padding" style="padding: 50px 50px 30px 50px; border-bottom: 1px solid #eee;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <span class="badge" style="display: inline-block; background-color: #ff5149; color: #fff; font-size: 10px; font-weight: bold; letter-spacing: 2px; padding: 6px 12px; border-radius: 3px; text-transform: uppercase;">Nuova Richiesta</span>
                                        <h2 class="heading-md text-dark" style="margin: 20px 0 10px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">Hai ricevuto un nuovo messaggio</h2>
                                        <p class="text-sm text-gray" style="margin: 0; color: #888; font-size: 14px;">dal form contatti del sito web</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Info Cliente -->
                    <tr>
                        <td class="content-padding" style="padding: 40px 50px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                
                                <!-- Riga Nome -->
                                <tr>
                                    <td class="border-bottom" style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="120" class="text-label text-muted" style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Nome</td>
                                                <td class="text-dark" style="color: #1a1a1a; font-size: 16px; font-weight: 500;">{{ $data['name'] }}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Riga Email -->
                                <tr>
                                    <td class="border-bottom" style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="120" class="text-label text-muted" style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Email</td>
                                                <td>
                                                    <a href="mailto:{{ $data['email'] }}" class="link-accent" style="color: #ff5149; font-size: 16px; text-decoration: none;">{{ $data['email'] }}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Riga Telefono -->
                                <tr>
                                    <td class="border-bottom" style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="120" class="text-label text-muted" style="color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Telefono</td>
                                                <td style="color: #1a1a1a; font-size: 16px;">
                                                    @if(!empty($data['phone']))
                                                        <a href="tel:{{ $data['phone'] }}" class="link-dark" style="color: #1a1a1a; text-decoration: none;">{{ $data['phone'] }}</a>
                                                    @else
                                                        <span class="text-light" style="color: #ccc;">Non specificato</span>
                                                    @endif
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Dettagli Progetto -->
                    <tr>
                        <td style="padding: 0 50px 40px 50px;">
                            <table width="100%" cellpadding="0" cellspacing="0" class="bg-light-gray" style="background-color: #fafafa; border-radius: 6px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 25px 30px;">
                                        <p class="text-label text-muted" style="margin: 0 0 15px 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Dettagli Richiesta</p>
                                        
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="50%" style="padding: 10px 0;">
                                                    <span class="text-label text-muted" style="display: block; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Servizio</span>
                                                    <span class="text-dark" style="color: #1a1a1a; font-size: 15px; font-weight: 500;">{{ $data['service'] ?? 'Non specificato' }}</span>
                                                </td>
                                                <td width="50%" style="padding: 10px 0;">
                                                    <span class="text-label text-muted" style="display: block; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Budget</span>
                                                    <span class="text-dark" style="color: #1a1a1a; font-size: 15px; font-weight: 500;">{{ $data['budget'] ?? 'Da definire' }}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Messaggio -->
                    <tr>
                        <td style="padding: 0 50px 50px 50px;">
                            <p class="text-label text-muted" style="margin: 0 0 15px 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Messaggio</p>
                            <div class="border-left-accent text-body" style="background-color: #fff; border-left: 4px solid #ff5149; padding: 20px 25px; color: #444; font-size: 15px; line-height: 1.8;">
                                {{ $data['message'] }}
                            </div>
                        </td>
                    </tr>
                    
                    <!-- CTA Button -->
                    <tr>
                        <td style="padding: 0 50px 50px 50px; text-align: center;">
                            <a href="mailto:{{ $data['email'] }}?subject=Re: Richiesta da Arredorama" class="btn-primary" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 16px 40px; border-radius: 4px;">
                                Rispondi al Cliente
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="bg-light-gray" style="background-color: #fafafa; padding: 30px 50px; text-align: center; border-top: 1px solid #eee;">
                            <p class="text-xs text-muted" style="margin: 0 0 10px 0; color: #999; font-size: 12px;">
                                Questa email è stata generata automaticamente dal sito
                            </p>
                            <p class="text-sm text-dark" style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">
                                arredorama.it
                            </p>
                        </td>
                    </tr>
                    
                </table>
                
                <!-- Footer esterno -->
                <table width="600" cellpadding="0" cellspacing="0" class="container">
                    <tr>
                        <td style="padding: 30px 50px; text-align: center;">
                            <p class="text-xxs" style="margin: 0; color: #aaa; font-size: 11px;">
                                © {{ date('Y') }} Arredorama - Il Grande Spazio delle Idee<br>
                                Via Example, 123 - 20100 Milano (MI)
                            </p>
                        </td>
                    </tr>
                </table>
                
            </td>
        </tr>
    </table>
    
</body>
</html>