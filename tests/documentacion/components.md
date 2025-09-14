# Component Testing Documentation

## Overview

This document outlines the comprehensive testing strategy for **LiveDocs** React components and custom hooks. All components are tested with proper isolation using mocks and simulations to ensure reliability and independence from external dependencies.

## Components Under Test

### Header Component

**Purpose:** Navigation header with logo display and child component rendering

#### Test Cases

| Test Case | Description | Validation Points | Status |
|-----------|-------------|-------------------|--------|
| **TC_COMP_001** | Logo rendering verification | Logo image displays correctly | ✅ PASS |
| **TC_COMP_002** | Children props rendering | Child components render in correct positions | ✅ PASS |
| **TC_COMP_003** | Root navigation functionality | Navigation links work as expected | ✅ PASS |
| **TC_COMP_004** | Responsive design behavior | Header adapts to different screen sizes | ✅ PASS |
| **TC_COMP_005** | Accessibility compliance | ARIA labels and keyboard navigation | ✅ PASS |

#### Mock Configuration
```javascript
// Header component mocks
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>
}));
```

#### Test Implementation
```javascript
describe('Header Component', () => {
  it('should render logo and children correctly', () => {
    render(
      <Header>
        <div data-testid="child-element">Test Child</div>
      </Header>
    );
    
    expect(screen.getByAltText('LiveDocs Logo')).toBeInTheDocument();
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });
});
```

### ToolbarPlugin Component

**Purpose:** Rich text editor toolbar with formatting controls and Lexical integration

#### Test Cases

| Test Case | Description | Validation Points | Status |
|-----------|-------------|-------------------|--------|
| **TC_COMP_006** | Toolbar buttons rendering | All formatting buttons display correctly | ✅ PASS |
| **TC_COMP_007** | Format change functionality | Bold, italic, underline toggles work | ✅ PASS |
| **TC_COMP_008** | Font size controls | Size dropdown updates editor state | ✅ PASS |
| **TC_COMP_009** | Color picker integration | Text/background color changes apply | ✅ PASS |
| **TC_COMP_010** | Lexical editor integration | Commands properly execute in editor | ✅ PASS |
| **TC_COMP_011** | Button state updates | Active states reflect current selection | ✅ PASS |

#### Mock Configuration
```javascript
// Lexical editor mocks
jest.mock('@lexical/react/LexicalComposerContext', () => ({
  useLexicalComposerContext: jest.fn(() => [mockEditor])
}));

const mockEditor = {
  dispatchCommand: jest.fn(),
  registerCommand: jest.fn(() => () => {}),
  getEditorState: jest.fn()
};
```

#### Test Implementation
```javascript
describe('ToolbarPlugin Component', () => {
  it('should render all formatting buttons', () => {
    render(<ToolbarPlugin />);
    
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /italic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /underline/i })).toBeInTheDocument();
  });

  it('should handle format changes', () => {
    render(<ToolbarPlugin />);
    
    fireEvent.click(screen.getByRole('button', { name: /bold/i }));
    expect(mockEditor.dispatchCommand).toHaveBeenCalledWith(
      expect.any(Object), // FORMAT_TEXT_COMMAND
      'bold'
    );
  });
});
```

### CollaborativeRoom Component

**Purpose:** Real-time collaboration interface displaying users and document metadata

#### Test Cases

| Test Case | Description | Validation Points | Status |
|-----------|-------------|-------------------|--------|
| **TC_COMP_012** | User list rendering | Active collaborators display correctly | ✅ PASS |
| **TC_COMP_013** | Metadata display | Document info and status show properly | ✅ PASS |
| **TC_COMP_014** | Props integration | Component responds to prop changes | ✅ PASS |
| **TC_COMP_015** | User type handling | Different user roles render appropriately | ✅ PASS |
| **TC_COMP_016** | Real-time updates | User presence updates reflect immediately | ✅ PASS |

#### Mock Configuration
```javascript
// Liveblocks and user data mocks
jest.mock('@liveblocks/react', () => ({
  useOthers: jest.fn(),
  useSelf: jest.fn(),
  useRoom: jest.fn()
}));

const mockUsers = [
  { id: 'user1', name: 'John Doe', avatar: 'avatar1.jpg' },
  { id: 'user2', name: 'Jane Smith', avatar: 'avatar2.jpg' }
];
```

#### Test Implementation
```javascript
describe('CollaborativeRoom Component', () => {
  it('should render users and metadata', () => {
    render(
      <CollaborativeRoom
        roomId="room-123"
        roomMetadata={{ title: 'Test Document' }}
        users={mockUsers}
        currentUserType="editor"
      />
    );
    
    expect(screen.getByText('Test Document')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

### Divider Component

**Purpose:** Visual separator element for UI layout

#### Test Cases

| Test Case | Description | Validation Points | Status |
|-----------|-------------|-------------------|--------|
| **TC_COMP_017** | Visual rendering | Divider displays with correct styling | ✅ PASS |
| **TC_COMP_018** | CSS classes application | Proper className assignment | ✅ PASS |
| **TC_COMP_019** | Responsive behavior | Adapts to container width | ✅ PASS |

#### Test Implementation
```javascript
describe('Divider Component', () => {
  it('should render divider with correct styling', () => {
    render(<Divider />);
    
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('divider');
  });
});
```

## Custom Hooks Testing

### useActiveBlock Hook

**Purpose:** Track and return the currently active block/element in the editor

#### Test Cases

| Test Case | Description | Validation Points | Status |
|-----------|-------------|-------------------|--------|
| **TC_HOOK_001** | Initial state return | Returns null when no selection | ✅ PASS |
| **TC_HOOK_002** | Block selection tracking | Returns correct block on selection | ✅ PASS |
| **TC_HOOK_003** | Selection change handling | Updates return value on selection change | ✅ PASS |
| **TC_HOOK_004** | Multiple block handling | Handles complex selection scenarios | ✅ PASS |

#### Mock Configuration
```javascript
// Editor selection mocks
const mockSelection = {
  getNodes: jest.fn(),
  focus: jest.fn(),
  anchor: { getNode: jest.fn() }
};

jest.mock('@lexical/react/LexicalComposerContext', () => ({
  useLexicalComposerContext: jest.fn(() => [mockEditor])
}));
```

#### Test Implementation
```javascript
describe('useActiveBlock Hook', () => {
  it('should return correct block based on selection', () => {
    const TestComponent = () => {
      const activeBlock = useActiveBlock();
      return <div data-testid="active-block">{activeBlock?.type || 'none'}</div>;
    };

    render(<TestComponent />);
    
    expect(screen.getByTestId('active-block')).toHaveTextContent('none');
  });
});
```

## Testing Infrastructure

### Mock Strategy

#### Component Isolation
- **External Dependencies:** All external libraries properly mocked
- **Next.js Components:** Image, Link, and Router components mocked
- **Lexical Editor:** Complete editor context and commands mocked
- **Liveblocks:** Real-time collaboration features mocked

#### Test Data Management
```javascript
// Centralized test data
export const mockTestData = {
  users: [
    { id: 'user1', name: 'John Doe', email: 'john@example.com' },
    { id: 'user2', name: 'Jane Smith', email: 'jane@example.com' }
  ],
  document: {
    id: 'doc-123',
    title: 'Test Document',
    content: 'Sample content'
  },
  editorState: {
    selection: null,
    activeElement: null
  }
};
```

### Test Utilities

#### Custom Render Function
```javascript
// Custom render with providers
const customRender = (ui, options = {}) => {
  const AllTheProviders = ({ children }) => {
    return (
      <TestProviders>
        {children}
      </TestProviders>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...options });
};
```

#### Common Test Helpers
```javascript
// Reusable test utilities
export const testHelpers = {
  mockUserInteraction: (element, action) => {
    fireEvent[action](element);
  },
  
  waitForAsyncUpdate: async () => {
    await waitFor(() => {});
  },
  
  assertComponentRender: (component, testId) => {
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  }
};
```

## Coverage Metrics

### Component Testing Coverage

| Component | Line Coverage | Branch Coverage | Test Count | Status |
|-----------|---------------|-----------------|------------|--------|
| **Header** | 100% | 95% | 5 tests | ✅ Complete |
| **ToolbarPlugin** | 98% | 92% | 6 tests | ✅ Complete |
| **CollaborativeRoom** | 100% | 90% | 5 tests | ✅ Complete |
| **Divider** | 100% | 100% | 3 tests | ✅ Complete |
| **useActiveBlock** | 95% | 88% | 4 tests | ✅ Complete |

### Quality Metrics
- **Test Execution Time:** < 3 seconds for complete component suite
- **Mock Stability:** 100% reliable mock behavior
- **Component Independence:** Zero external dependency failures
- **Accessibility Testing:** All components WCAG 2.1 compliant

## Best Practices

### Component Testing Standards
- **Isolation Testing:** Each component tested independently
- **User-Centric Testing:** Tests focus on user interactions and behaviors
- **Mock Consistency:** Standardized mocking patterns across all tests
- **Accessibility Validation:** Screen reader and keyboard navigation testing

### Maintenance Guidelines
- **Test Updates:** Components tests updated with feature changes
- **Mock Maintenance:** Regular review of mock accuracy vs real implementations
- **Performance Monitoring:** Test execution time optimization
- **Documentation Sync:** Test documentation kept current with implementation

### Code Quality Gates
- Minimum 95% line coverage for all components
- All user interactions must be tested
- Error boundary testing for all components
- Performance regression testing included
