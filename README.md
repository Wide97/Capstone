# Capstone


[https://github.com/Wide97/CapstoneBE](https://github.com/Wide97/CapstoneBE/tree/master)


# Trading Journal - Capstone Project

Benvenuto nel repository del **Trading Journal**, il progetto capstone sviluppato per fornire una piattaforma completa per monitorare, analizzare e ottimizzare le performance di trading.

## Descrizione del Progetto

Il **Trading Journal** è un'applicazione full-stack progettata per consentire agli utenti di:
- Registrare i propri trade con dettagli completi.
- Analizzare le performance attraverso grafici e report dettagliati.
- Generare uno storico mensile dei risultati.
- Personalizzare l'applicazione in base alle proprie esigenze, selezionando valute e impostando un capitale iniziale.

L'applicazione è stata sviluppata utilizzando **React.js** per il frontend e **Spring Boot** per il backend, con **PostgreSQL** come database.

---

## Funzionalità Principali

### **1. Gestione Utente**
- **Registrazione e Login**: Accesso sicuro tramite autenticazione JWT.
- **Profilo Utente**:
  - Modifica username e password.
  - Caricamento immagine profilo.
  - Impostazione del capitale iniziale.
  - Selezione della valuta preferita.

### **2. Gestione dei Trade**
- **Registrazione dei Trade**: Inserimento dettagliato di ogni operazione, inclusi:
  - Data e ora di acquisto e vendita.
  - Leva finanziaria.
  - Tipo di trade (long/short).
  - Strategia utilizzata.
  - Costi e risultati (profitto/perdita).
- **Modifica ed Eliminazione**: Possibilità di aggiornare o rimuovere trade esistenti.

### **3. Analisi e Reporting**
- **Analytics**: Visualizzazione di grafici e statistiche per monitorare:
  - Andamento del capitale.
  - Performance per strategia.
  - Percentuali di successo.
- **Report**: Generazione di riepiloghi mensili con profitti, perdite e capitale finale.

### **4. Storico**
- Archiviazione di report mensili per un confronto a lungo termine.
- Filtraggio dei dati per analisi approfondite.

### **5. Demo e Tutorial**
- Una pagina dedicata con video tutorial che spiegano come utilizzare ogni funzionalità del sito.

---

## Tecnologie Utilizzate

### **Frontend**
- **React.js**
  - React Router per la navigazione.
  - SCSS per lo stile, con variabili e mixin centralizzati.
  - Componenti modulari e responsive.

### **Backend**
- **Spring Boot**
  - API RESTful.
  - Gestione delle entità tramite Hibernate.
  - Sicurezza con Spring Security e JWT.

### **Database**
- **PostgreSQL**
  - Schema relazionale ottimizzato per gestire utenti, valute, trade e storico.

---

## Installazione

### **Requisiti**
- Node.js (versione 16 o superiore).
- Java JDK (versione 17 o superiore).
- PostgreSQL (versione 14 o superiore).

### **Istruzioni per l'Installazione**

#### 1. Clona il repository
```bash
$ git clone https://github.com/Wide97/Capstone.git
$ cd Capstone/trading-journal
```

#### 2. Configura il Backend
- Accedi alla cartella `backend`.
- Configura il file `application.properties` con i dati del tuo database PostgreSQL:
  ```properties
  spring.datasource.url=jdbc:postgresql://localhost:5432/trading_journal
  spring.datasource.username=tuo_username
  spring.datasource.password=tua_password
  ```
- Avvia il server Spring Boot:
  ```bash
  $ mvn spring-boot:run
  ```

#### 3. Configura il Frontend
- Accedi alla cartella `frontend`.
- Installa le dipendenze:
  ```bash
  $ npm install
  ```
- Avvia il server di sviluppo:
  ```bash
  $ npm start
  ```

#### 4. Accedi all'applicazione
- Visita `http://localhost:3000` nel tuo browser.

---

## Struttura del Progetto

### **Frontend**
- `src/components`: Contiene tutti i componenti React principali, inclusi:
  - **Homepage**: Pagina iniziale.
  - **UserProfile**: Gestione del profilo utente.
  - **UserJournal**: Registrazione e modifica dei trade.
  - **UserAnalytics**: Visualizzazione dei grafici.
  - **UserReport**: Generazione dei report.
- `src/styles`: File SCSS con stili centralizzati e gradienti animati.

### **Backend**
- `src/main/java`: Contiene:
  - **Entities**: Modelli di dati (Utente, Trade, Valuta, Storico).
  - **Services**: Logica di business.
  - **Controllers**: API RESTful.
  - **Repositories**: Accesso al database tramite Spring Data JPA.

---

## Funzionalità Future
- Aggiungere filtri avanzati per i grafici.
- Esportazione dei dati in formato CSV o PDF.
- Supporto per ulteriori valute.

---

## Contributi
Contributi, suggerimenti e feedback sono benvenuti! Sentiti libero di aprire una **issue** o inviare una **pull request**.

---

## Autore
- **Marco Widesott**
- Email: [mwidesott@gmail.com](mailto:mwidesott@gmail.com)
- LinkedIn: [linkedin.com/in/marco-widesott](https://linkedin.com/in/marco-widesott)

---

Grazie per aver esplorato il progetto Trading Journal! Se trovi utile questa applicazione, lascia una stella ⭐ su GitHub.


 
