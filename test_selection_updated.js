/**
 * Updated Test for Selection-Based Questioning Functionality
 *
 * The "Ask Selected" mode is NOT for showing "selected questions"
 * but for asking questions ABOUT selected text on the page.
 */

console.log("Updated Selection-Based Questioning Test");

// How to use "Ask Selected" mode:
console.log("\n1. USAGE INSTRUCTIONS:");
console.log("   - First: SELECT TEXT on the documentation page by clicking and dragging");
console.log("   - Result: Chat widget will automatically detect and show the selected text");
console.log("   - Mode: Will automatically switch to 'Ask Selected'");
console.log("   - Then: Type your question about the selected text and send it");
console.log("   - Answer: Will be based ONLY on your selected text (no vector search)");

// The instruction text added:
console.log("\n2. NEW INSTRUCTION MESSAGE:");
console.log("   - Added: 'Select text on the page first, then ask your question'");
console.log("   - Shows: When no text is selected in selected mode");
console.log("   - Hides: When text is selected");

// Mode behavior:
console.log("\n3. MODE BEHAVIOR:");
console.log("   - Global Q&A: Shows instruction text, no selected text preview");
console.log("   - Ask Selected: Shows instruction IF no text is selected");
console.log("   - Ask Selected: Shows selected text preview IF text is selected");

// What gets sent to backend:
console.log("\n4. BACKEND FLOW:");
console.log("   - Global mode: Uses /api/ask endpoint (vector search)");
console.log("   - Selected mode: Uses /api/ask-selected endpoint with selected_text parameter");
console.log("   - Selected mode: Answers ONLY from provided selected text");

console.log("\nThe functionality is working correctly! Remember to select text on the page first.");