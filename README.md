# Document Upload and Extraction

## Static Site Deployment

Demo site is deployed on [Render.com](https://paradigm-document-upload-and-extraction.onrender.com/)

> ### ⚠️ Important Note About Demo Site
>
> **The demo site may take up to 1-2 minutes to load on first visit.** This is because Render's free tier automatically spins down static sites after 15 minutes of inactivity to conserve resources. When you visit, it needs to spin up again. This is not indicative of the application's actual performance, but rather a limitation of the hosting environment.
>
> Once loaded, the site will be responsive and fast until it experiences another period of inactivity.

Repo found at [Github](https://github.com/ianbuchanan42/paradigm-document-upload-and-extraction)

Or just clone repo and npm install -> npm run dev

## My Intentions

With this take home my main focus was front-end and the user experience, exploring how forms could be represented to best improve work flow and cognitive load.

The bullet points are a mix of opinionated approaches and questions regarding how we would want to approach different challenges. Questions come from both my lack of experience within criminal litigation and law in general and my lack of experience with deep diving into and deploying scalable backend systems.

I chose to create this README document and create a live demo to best represent my ideas of how to explore different form options. I used Cursor to mock up dirty/quick representations of the components, but this does not reflect how I would want to actually develop these components.

In reality I would break down the needs of each component, find ways to reuse smaller components across the application, and leverage Next.js and it diverse options of server side rendering: Server Side Rendering (rendering on request), Static Site Generation (so much can be done this way for content that is not going to change much), Incremental Static Regeneration (allows for windows/slots for specific dynamic elements) and of course Client Side Rendering (avoid whenever possible).

In regards to Tailwind customization, this would come after months of development, allowing for the identification of what custom classes we need to avoid repeating ourselves and default styling we truly want.

Over all this project is meant to show my ability to image situations and responded with design ideas. This would be greatly with more context and obviously guidance from those who have actual experience int he field.

## User Story

"As a prosecutor or legal assistant, I want to upload a scanned image of a police report and receive structured, extracted data for review and approval."

## System Overview

This implementation leverages Next.js for the frontend with Tailwind CSS for styling, focusing on responsive design.

## Workflow Phases

### 1. Upload Phase

The paralegal uploads a scanned police report from the New Case workflow.

**Technical Implementation:**

- Multi upload options:
  - Traditional file selection
  - Drag-and-drop functionality
  - Take a photo or scan live document?
- File validation checking for acceptable formats (PDF, JPEG, PNG, TIFF) and size constraints
- Secure upload with client-side encryption using [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API), this would need some serious digging into to implement correctly and outside security checking. If done wrong it truly offers no improvement to security.
- Authentication validation ensuring only authorized users can upload documents. Also how often are we re-checking authentication, at what steps?
- Document-to-case linking implemented either during initial upload (via the New Case workflow) or after extraction when editing document metadata?

**UI Considerations:**

- Simple and intuitive interface.
- Accessibility compliance ensuring keyboard navigation, which can also be leveraged by "super users".
- Responsive design adapting to desktop, tablet, and mobile devices.

### 2. Confirmation & Processing Phase

The user receives confirmation that the upload was successful and that extraction is underway.

**Technical Implementation:**

- Real-time progress tracking via WebSocket connection
  - A persistent WebSocket connection is established between the client (Next.js) and the backend. Once the processing starts, the backend sends periodic messages (e.g., "Section 1 processed", "50% complete") through the socket. This approach is more efficient than HTTP polling since the server pushes updates only when there's new information.
  - I have not used WebSockets, but seems like a possible good use case for them.
- Backend OCR processing with section segmentation
  - Section Segmentation: Once the text is extracted, algorithms (either rule-based or powered by NLP techniques) analyze document structure (like headings, page breaks, or layout patterns) to segment the text into distinct sections. These sections would represent different parts of the uploaded report.
- Document metadata extraction (date, case number, involved parties)
  - This metadata would allow for the generation of tags, key information, summarizing and making processed reports more searchable.

**UI Considerations:**

- Animated progress indicator showing upload and processing status and Informative status messages explaining current processing stage. This ties into how we might use WebSockets.
- Skeleton components serving as placeholders until sections are processed. Improving perceived speed.

### 3. Editing & Review Phase

Once processed, the editable extracted text appears side-by-side with the document image with a "Confirm" button when the user is satisfied with the text.

**Technical Implementation:**

- It would be nice to have spelling errors, issues or concern indicators for each section. Finding a way to highlight both the form and corresponding issue on the uploaded report. Though this would take some serious processing to map values on the report to the correct form elements.
- Document segmentation into logical sections (header, narrative, evidence items, etc.)
- Debounced auto-save functionality (1-second interval after typing stops)
- Section-specific validation rules.
- A lot of options could be user settings that allow the user to decide if they prefer speed or intuitive helper tools that take more time to process per upload.

**UI Considerations:**

- Responsive side-by-side layout that adapts to different screen sizes
- Section tabs or accordion interface to focus on one section at a time
- Visual indicators for:
  - Modified but unsaved content
  - Validation issues or extraction confidence concerns
  - Successfully saved changes
- Accessible text editing with keyboard shortcuts and contextual formatting options
- Do we want to have any kind of undo or reset buttons? This add complexity for history management which due to security might not be able to be handled client side.

### 4. Approval & Storage Phase

Upon approval, the backend stores the cleaned text and an embedding of the document for future retrieval/search.

**Technical Implementation:**

!!! This is where I get a bit fuzzy on the details....

- Secure API call to confirm document approval
- Backend generation of text embeddings using NLP
- Integration with database for storage

**UI Considerations:**

- Loading indicators during the approval process
- Success notification confirming storage completion
- Error handling with clear user guidance for failure scenarios
- Retry mechanisms for failures

### 5. Summary & Tagging Phase

The UI presents a summary of the document, relevant tags, and extracted entities and locations.

**Technical Implementation:**

- AI-generated document summary
- NLP-based processing / extraction / tag creation
- Tag suggestion from predefined list based on document content
- Search optimization through proper indexing of tags

**UI Considerations:**

- Clean, scannable presentation of summary and metadata
- Interactive tag management interface
- Entity highlighting within document context
- Location visualization option (map integration where appropriate), might be over kill?
- Grouping and favorite functionality for document organization

### 6. Item-Level Approval

The user can approve or reject each item individually.

**Technical Implementation:**

- Feedback collection for rejected items
- Re-generation API calls for rejected summaries

**UI Considerations:**

- Clear approve/reject controls for each item
- Feedback form for improvement suggestions on rejected items
- Visual differentiation between approved, rejected, and pending items

### 7. Completion & Post-Editing

After clicking "Finish," the process concludes.

**Technical Implementation:**

- Document finalization API call

**UI Considerations:**

- Confirmation of completion
- Clear navigation options for next actions
- Access to finalized document based on permission levels

## Security Considerations

- HTTPS encryption for all data transmission
- Authentication and authorization checks at all endpoints
- Secure document storage with encryption at rest
- Audit logging of all document interactions, not sure how best to do this?

## Performance Optimization

- Lazy loading of document sections
- Image compression and progressive loading
- Efficient state management to minimize re-renders
- Server-side rendering for initial page load

## Accessibility Features

- Semantic HTML structure
- ARIA attributes for interactive elements
- Keyboard navigation support
- Color contrast compliance, current demo is not great on this!
- Focus management during multi-step workflows

## Future Enhancements

- Batch document processing
- Advanced search capabilities
- Integration with case management systems, maybe?
- Mobile application support
- Offline mode capabilities
