# Document Upload and Extraction

## User Story

"As a prosecutor or legal assistant, I want to upload a scanned image of a police report and receive structured, extracted data for review and approval."

## System Overview

This implementation leverages Next.js for the frontend with Tailwind CSS for styling, focusing on responsive design and accessibility through Semantic HTML. Testing is performed using Puppeteer for end-to-end validation. The system integrates with a Django backend and AWS services for document processing and storage.

## Workflow Phases

### 1. Upload Phase

The paralegal uploads a scanned police report from the New Case workflow.

**Technical Implementation:**

- Multi-method upload interface supporting:
  - Traditional file selection
  - Drag-and-drop functionality
  - Take a photo or scan live document?
- File validation checking for acceptable formats (PDF, JPEG, PNG, TIFF) and size constraints
- Secure upload with client-side encryption and HTTPS transmission
- Authentication validation ensuring only authorized users can upload documents
- Client/case association established prior to upload through the New Case workflow context

**UI Considerations:**

- Simple, intuitive interface with clear visual affordances
- Accessibility compliance ensuring keyboard navigation
- Responsive design adapting to desktop, tablet, and mobile devices

### 2. Confirmation & Processing Phase

The user receives confirmation that the upload was successful and that extraction is underway.

**Technical Implementation:**

- Real-time progress tracking via WebSocket connection
- Backend OCR processing with section segmentation
- Document metadata extraction (date, case number, involved parties)

**UI Considerations:**

- Animated progress indicator showing upload and processing status
- Skeleton components serving as placeholders until sections are processed
- Informative status messages explaining current processing stage
- Option for section-by-section loading to enable earlier interaction with available data

### 3. Editing & Review Phase

Once processed, the editable extracted text appears side-by-side with the document image with a "Confirm" button when the user is satisfied with the text.

**Technical Implementation:**

- Document segmentation into logical sections (header, narrative, evidence items, etc.)
- Next.js state management for tracking edited content
- Debounced auto-save functionality (1-second interval after typing stops)
- Section-specific validation rules

**UI Considerations:**

- Responsive side-by-side layout that adapts to different screen sizes
- Section tabs or accordion interface to focus on one section at a time
- Visual indicators for:
  - Modified but unsaved content
  - Validation issues or extraction confidence concerns
  - Successfully saved changes
- Accessible text editing with keyboard shortcuts and contextual formatting options

### 4. Approval & Storage Phase

Upon approval, the backend stores the cleaned text and an embedding of the document for future retrieval/search.

**Technical Implementation:**

- Secure API call to confirm document approval
- Backend generation of text embeddings using NLP techniques
- Integration with database for structured storage

**UI Considerations:**

- Loading indicators during the approval process
- Success notification confirming storage completion
- Error handling with clear user guidance for failure scenarios
- Retry mechanisms for transient failures

### 5. Summary & Tagging Phase

The UI presents a summary of the document, relevant tags, and extracted entities and locations.

**Technical Implementation:**

- AI-generated document summary
- NLP-based entity and location extraction
- Tag suggestion from predefined list based on document content
- Search optimization through proper indexing

**UI Considerations:**

- Clean, scannable presentation of summary and metadata
- Interactive tag management interface
- Entity highlighting within document context
- Location visualization option (map integration where appropriate)
- Grouping and favorite functionality for document organization

### 6. Item-Level Approval

The user can approve or reject each item individually.

**Technical Implementation:**

- Granular approval state tracking per item
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
- Access control settings application
- Audit trail creation

**UI Considerations:**

- Confirmation of completion
- Clear navigation options for next actions
- Access to finalized document based on permission levels

## Security Considerations

- HTTPS encryption for all data transmission
- Authentication and authorization checks at all endpoints
- Secure document storage with encryption at rest
- Audit logging of all document interactions

## Performance Optimization

- Lazy loading of document sections
- Image compression and progressive loading
- Efficient state management to minimize re-renders
- Server-side rendering for initial page load

## Accessibility Features

- Semantic HTML structure
- ARIA attributes for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus management during multi-step workflows

## Future Enhancements

- Batch document processing
- Advanced search capabilities
- Integration with case management systems
- Mobile application support
- Offline mode capabilities
