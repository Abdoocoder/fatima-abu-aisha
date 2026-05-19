# Fatima Abu Aisha Legal Website

## Product Overview

Professional legal website for lawyer Fatima Abdul Rahim Abu Aisha. Presents legal services, professional profile, legal articles, and secure client interaction. Supports lead generation, consultation booking, and a secure client portal for documents and communication.

### Primary Goals

- Increase client inquiries
- Present professional legal credibility
- Provide structured legal information
- Offer secure digital interaction with clients

### Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Backend | Convex |
| Authentication | Clerk |
| Deployment | Vercel |
| Language | Arabic (RTL layout) |
| Target market | Jordan and Arabic-speaking clients |

## Business Objectives

- Generate new legal leads (target: 20+ inquiries/month)
- Improve professional online presence
- Enable structured communication with clients
- Create a long-term digital legal content platform

### Key Success Metrics

| Metric | Target |
|---|---|
| Monthly client inquiries | 20+ |
| Homepage load speed | <1.5s |
| Lead conversion rate | ≥3% |
| User login success rate | 99% |
| SEO visibility | Top results for lawyer name |

## Target Users

### Individual Legal Clients

Individuals seeking legal consultation. Need clear service explanation, simple contact method, trust in lawyer credentials.

### Business Clients

Companies needing contract or dispute consultation. Need professional credibility, legal documentation support, long-term communication.

### Registered Clients

Existing clients with active legal cases. Need secure document exchange, appointment tracking, private communication.

## Core Features

### Public Website

- Homepage — professional intro, services overview, quick-contact CTA
- About — biography, experience, education, qualifications
- Services — civil, commercial, family law; legal consultations; contract review
- Articles — legal knowledge, case explanations, awareness content (SEO + authority)
- Contact — form, phone, email, office location map
- Consultation booking

### Client Portal (secure, Clerk auth)

- Private dashboard per client
- Upload/download legal documents
- View legal updates
- Receive messages from lawyer
- View appointments

### Admin Tools

- Manage client messages and consultation requests
- Upload client documents
- Publish legal articles
- Update services

## Functional Requirements

### Pages

Homepage, About, Services, Articles, Contact

### Contact Form

Fields: Name, Phone, Email, Message. Validation required.

### Authentication

Secure login/session handling via Clerk

### Client Dashboard

File upload/download, appointment list, client messages

### Admin Management

Content editing, article publishing, client message/document management

### Metadata & SEO

Meta title, description, Open Graph tags per page

## Non-Functional Requirements

- Performance: Page load <1.5s
- Security: HTTPS, secure auth, protected document storage
- Scalability: Support growing clients and articles
- Accessibility: WCAG 2.1 AA
- Language: Full Arabic interface, RTL layout
- Privacy: User data protection, legal privacy policy

## Information Architecture

### Primary Navigation

Home | About | Services | Articles | Contact | Client Login

### Footer

Contact info, legal policies, social media links

## Security & Authentication

- Clerk authentication required for dashboard access
- Role-based access: Admin / Client
- Document access restricted per user
- Encrypted transmission via HTTPS

## Performance Targets

- Server response <300ms
- Optimized images via Next.js Image
- Static generation for articles and content pages

## Deployment

- Hosting: Vercel
- CI/CD: GitHub → Vercel auto-deploy on push
- Environment variables: Convex URL, Clerk keys

## Acceptance Criteria

- All pages load correctly in Arabic with RTL layout
- Contact form stores messages in database
- Client portal accessible only after login
- Documents accessible only to correct client
- Articles appear correctly in blog section
- Homepage loading speed meets performance target
