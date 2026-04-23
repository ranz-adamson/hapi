```mermaid
graph TD
    %% External Systems
    WP[WordPress Website<br/>Gravity Forms]
    PS[ProSelect Software<br/>XML & Images zip]
    Mail[Gmail / SMTP<br/>IMAP & PHPMailer]

    %% Infrastructure & OS
    subgraph "On-Premise Infrastructure (Oracle VM / Debian Linux)"
        
        %% Web Server & App Layer
        subgraph "Application Layer (Apache / PHP 7.4)"
            UI[Frontend: HTML/JS/jQuery UI]
            Core[HAPI Core Engine<br/>Procedural/OOP PHP]
            PDF[mPDF Invoice Generator]
            CRUD[Metadata-Driven UI Engine]
        end

        %% Database Layer
        subgraph "Database Layer (MariaDB)"
            DB_Clients[(Clients & Leads)]
            DB_O2C[(Orders & Invoices)]
            DB_Meta[(System Metadata<br/>map, mapdata, maptable)]
        end
        
        %% Internal Connections
        UI <--> Core
        Core <--> PDF
        Core <--> CRUD
        CRUD <--> DB_Meta
        Core <--> DB_Clients
        Core <--> DB_O2C
    end

    %% External Connections
    WP -- "Direct DB Read (Leads/Vouchers)" --> Core
    PS -- "Automated Zip Import" --> Core
    Core -- "Email Notifications & Invoices" --> Mail
    Mail -- "IMAP Parsing" --> Core
