import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from '../models/Question.js';

// Load environment variables from backend/.env
dotenv.config();

const questionsData = [
  // =========================================================================
  // UNIT 1: JavaScript and TypeScript Essentials (15 Questions)
  // =========================================================================
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'Which JavaScript keyword declares a block-scoped variable that can be reassigned?',
    options: [
      { label: 'A', text: 'var' },
      { label: 'B', text: 'let' },
      { label: 'C', text: 'const' },
      { label: 'D', text: 'function' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: "'var' is function-scoped (or globally scoped if declared outside a function), not block-scoped, and suffers from hoisting anomalies.",
      B: "'let' declares a block-scoped variable whose value can be reassigned within its scope.",
      C: "'const' is block-scoped, but variables declared with const cannot be reassigned after initialization.",
      D: "'function' is a keyword used to declare functions, not variables.",
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'How do ES6 arrow functions behave regarding their "this" context?',
    options: [
      { label: 'A', text: 'They bind "this" dynamically based on how the function is called.' },
      { label: 'B', text: 'They inherit "this" lexically from their enclosing scope.' },
      { label: 'C', text: 'They always bind "this" to the global window or global object.' },
      { label: 'D', text: 'They create a new "this" instance every time they are executed.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Standard function declarations bind "this" dynamically at call time, not arrow functions.',
      B: 'Arrow functions do not have their own "this" binding; they capture the "this" value of the enclosing lexical execution context.',
      C: 'Arrow functions only point to the global object if declared in the global scope, not in all execution contexts.',
      D: 'Arrow functions cannot be used as constructors with the "new" keyword and do not generate a new instance of "this".',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'Which array method creates a new array populated with the results of calling a provided function on every element?',
    options: [
      { label: 'A', text: 'forEach()' },
      { label: 'B', text: 'filter()' },
      { label: 'C', text: 'map()' },
      { label: 'D', text: 'reduce()' },
    ],
    correctAnswer: 'C',
    explanations: {
      A: "'forEach()' executes a callback for each element but always returns undefined; it does not return a new transformed array.",
      B: "'filter()' returns a new array containing only elements that satisfy a boolean condition, rather than transforming every element.",
      C: "'map()' creates and returns a brand new array containing the transformed output for every element in the original array.",
      D: "'reduce()' executes a reducer function to accumulate array elements down into a single cumulative output value.",
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'What will be stored in the variable "title" from the following code?\nconst course = { name: "Full Stack", duration: "6 Months" };\nconst { name: title } = course;',
    options: [
      { label: 'A', text: 'undefined' },
      { label: 'B', text: '"Full Stack"' },
      { label: 'C', text: '"name"' },
      { label: 'D', text: 'ReferenceError' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'The property "name" exists on course, so renaming during destructuring assigns its actual value rather than undefined.',
      B: 'The syntax { name: title } extracts the value of the "name" property ("Full Stack") and assigns it to a new local variable named "title".',
      C: 'Destructuring extracts the property\'s value ("Full Stack"), not the property key string "name".',
      D: 'This is valid ES6 destructuring alias syntax and executes cleanly without throwing a ReferenceError.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'Which character and syntax are used for string interpolation in ES6 template literals?',
    options: [
      { label: 'A', text: 'Single quotes with %s, e.g., \'Hello %s\'' },
      { label: 'B', text: 'Double quotes with #(), e.g., "Hello #(name)"' },
      { label: 'C', text: 'Backticks with ${}, e.g., `Hello ${name}`' },
      { label: 'D', text: 'Ampersands with {}, e.g., &Hello {name}&' },
    ],
    correctAnswer: 'C',
    explanations: {
      A: 'Single quotes do not support template interpolation; %s is used in printf-style formatting in C or console.log.',
      B: 'Double quotes denote standard string primitives in JavaScript and do not support dynamic variable interpolation.',
      C: 'ES6 template literals are enclosed by backtick (`) characters and use the ${expression} placeholder syntax.',
      D: 'Ampersands are logical or bitwise operators in JavaScript, not string delimiters.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'In ES Modules, how many "default" exports can a single module file have?',
    options: [
      { label: 'A', text: 'Exactly one' },
      { label: 'B', text: 'Up to three' },
      { label: 'C', text: 'Unlimited' },
      { label: 'D', text: 'Zero (only named exports are allowed)' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'According to ECMAScript module specifications, a file can have multiple named exports but at most one default export.',
      B: 'JavaScript throws a syntax error if more than one default export is declared in a single file.',
      C: 'Only named exports can be unlimited; default exports are strictly limited to one per module.',
      D: 'ES Modules fully support default exports alongside named exports.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'What is the primary difference between Promise.all() and Promise.allSettled()?',
    options: [
      { label: 'A', text: 'Promise.all() waits for all promises, whereas Promise.allSettled() rejects if any promise fails.' },
      { label: 'B', text: 'Promise.all() rejects immediately upon the first rejected promise, while Promise.allSettled() waits for all promises to finish regardless of outcome.' },
      { label: 'C', text: 'Promise.all() is synchronous, while Promise.allSettled() is asynchronous.' },
      { label: 'D', text: 'Promise.allSettled() can only accept up to two promises.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'This statement is inverted; Promise.all() has fail-fast behavior, whereas Promise.allSettled() never rejects prematurely.',
      B: 'Promise.all() rejects as soon as any input promise rejects (fail-fast), while Promise.allSettled() waits until every promise either fulfills or rejects.',
      C: 'Both methods are inherently asynchronous and return a Promise.',
      D: 'Both Promise.all() and Promise.allSettled() accept an iterable containing any number of promises.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'What does an async function in JavaScript always return?',
    options: [
      { label: 'A', text: 'A raw primitive value' },
      { label: 'B', text: 'A Promise' },
      { label: 'C', text: 'A Callback function' },
      { label: 'D', text: 'An Observable' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Even if an async function returns a primitive like "return 5;", JavaScript automatically wraps it in a resolved Promise.',
      B: 'Async functions always return a Promise, which is either resolved with the returned value or rejected with an unhandled exception.',
      C: 'Async functions do not return callbacks; they are built on top of native Promises.',
      D: 'Observables are part of libraries like RxJS and are not native return types of JavaScript async functions.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'In TypeScript, what is the crucial safety difference between the "any" type and the "unknown" type?',
    options: [
      { label: 'A', text: '"any" allows type-safe property access, while "unknown" throws a runtime error immediately.' },
      { label: 'B', text: '"unknown" disables all compiler checks, while "any" enables strict mode.' },
      { label: 'C', text: '"any" allows performing any operation without type checks, while "unknown" requires type checking or narrowing before usage.' },
      { label: 'D', text: 'There is no difference; they are exact aliases for one another.' },
    ],
    correctAnswer: 'C',
    explanations: {
      A: '"unknown" does not throw runtime errors by itself; it triggers compile-time errors in TypeScript if used without narrowing.',
      B: '"any" is the type that disables compiler checks, not "unknown".',
      C: '"unknown" is the type-safe counterpart of "any". You cannot access properties or call methods on an "unknown" variable without first verifying its type.',
      D: 'They are fundamentally different: "any" turns off type safety, whereas "unknown" forces explicit type narrowing.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'Which TypeScript feature allows creating reusable components/functions that can work over a variety of types rather than a single one?',
    options: [
      { label: 'A', text: 'Generics' },
      { label: 'B', text: 'Namespaces' },
      { label: 'C', text: 'Decorators' },
      { label: 'D', text: 'Enums' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'Generics (e.g., function identity<T>(arg: T): T) allow writing flexible, reusable code while preserving complete type safety across multiple types.',
      B: 'Namespaces are an older TypeScript module organization mechanism, not a tool for generic type abstraction.',
      C: 'Decorators are annotations used to modify classes and class members at design time.',
      D: 'Enums allow defining a set of named numeric or string constants, not generic type parameters.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'Which TypeScript access modifier makes a class member accessible only within the declaring class and its subclasses?',
    options: [
      { label: 'A', text: 'private' },
      { label: 'B', text: 'protected' },
      { label: 'C', text: 'public' },
      { label: 'D', text: 'readonly' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: "'private' members are accessible only within the exact class they are declared in, not even in child subclasses.",
      B: "'protected' allows members to be accessed within the declaring class and any classes derived from it (subclasses).",
      C: "'public' members are accessible from anywhere outside and inside the class hierarchy.",
      D: "'readonly' prevents modification after initialization but does not restrict visibility across inheritance.",
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'What is the output of the following code snippet?\nconst original = { a: 1, b: { c: 2 } };\nconst copy = { ...original };\ncopy.b.c = 99;\nconsole.log(original.b.c);',
    options: [
      { label: 'A', text: '2' },
      { label: 'B', text: '99' },
      { label: 'C', text: 'undefined' },
      { label: 'D', text: 'TypeError' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'The spread operator performs a shallow copy, meaning nested objects are copied by reference rather than value.',
      B: 'Because the object spread operator ({ ...original }) creates a shallow copy, nested object references (b) are shared. Modifying copy.b.c mutates original.b.c to 99.',
      C: 'Property c is not deleted or undefined; it was successfully mutated to 99.',
      D: 'Object mutation is valid JavaScript and does not trigger a TypeError.',
    },
    difficulty: 'hard',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'Which file in a TypeScript project defines compiler options such as "target", "module", and "strict"?',
    options: [
      { label: 'A', text: 'package.json' },
      { label: 'B', text: 'tsconfig.json' },
      { label: 'C', text: 'babel.config.js' },
      { label: 'D', text: 'tslint.json' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'package.json manages project dependencies and npm scripts, not TypeScript compiler options.',
      B: 'tsconfig.json is the official configuration file for the TypeScript compiler (tsc), configuring compiler settings, targets, and file inclusions.',
      C: 'babel.config.js configures the Babel transpiler, not the core TypeScript compiler options.',
      D: 'tslint.json was used for linting (now deprecated in favor of ESLint) rather than compiler configuration.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'In the JavaScript event loop, which queue takes priority when executing asynchronous tasks?',
    options: [
      { label: 'A', text: 'Macrotask queue (e.g., setTimeout, setInterval)' },
      { label: 'B', text: 'Microtask queue (e.g., Promise.then, queueMicrotask)' },
      { label: 'C', text: 'Both queues have identical priority and alternate randomly' },
      { label: 'D', text: 'Render queue always executes before all microtasks' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Macrotasks wait until the current synchronous execution and all pending microtasks are completely emptied.',
      B: 'The Microtask queue has strict priority over the Macrotask queue. All microtasks are processed at the end of the current task before the event loop picks the next macrotask.',
      C: 'The event loop does not alternate randomly; it guarantees microtask exhaustion first.',
      D: 'Rendering steps happen after microtasks run and before/between macrotasks.',
    },
    difficulty: 'hard',
  },
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    questionText: 'In TypeScript, what is the key difference between an "interface" and a "type" alias when extending?',
    options: [
      { label: 'A', text: 'Interfaces support declaration merging (can be declared multiple times), while type aliases cannot.' },
      { label: 'B', text: 'Type aliases can only represent primitive types, never objects.' },
      { label: 'C', text: 'Interfaces cannot be implemented by classes.' },
      { label: 'D', text: 'Type aliases are compiled to JavaScript functions, while interfaces are compiled to objects.' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'Interfaces with the same name in the same scope automatically merge their declarations into one, whereas re-declaring a type alias with the same name throws a compiler error.',
      B: 'Type aliases can represent objects, unions, intersections, primitives, tuples, and functions.',
      C: 'Classes can implement both interfaces and type aliases that describe object shapes.',
      D: 'Both interfaces and type aliases are purely compile-time constructs in TypeScript and emit zero JavaScript code.',
    },
    difficulty: 'hard',
  },

  // =========================================================================
  // UNIT 2: ReactJS Frontend Development (15 Questions)
  // =========================================================================
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'In React, why are component props considered "read-only" (immutable)?',
    options: [
      { label: 'A', text: 'Because JavaScript objects are always frozen by default.' },
      { label: 'B', text: 'To maintain pure component behavior and ensure predictable one-way data flow.' },
      { label: 'C', text: 'Because browsers disallow modifying function parameters.' },
      { label: 'D', text: 'Props can actually be mutated directly without any consequences.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Standard JavaScript objects are mutable unless explicitly passed to Object.freeze().',
      B: 'React adheres to pure function principles: components must never modify their own props, ensuring predictable one-way data binding from parent to child.',
      C: 'JavaScript natively permits parameter mutation; the restriction is enforced by React design patterns and Strict Mode.',
      D: 'Mutating props directly causes subtle state inconsistency bugs and breaks React reconciliation.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'When updating state in React that depends on the previous state value, what is the recommended practice?',
    options: [
      { label: 'A', text: 'Directly increment the state variable: count = count + 1' },
      { label: 'B', text: 'Pass a callback function to the state setter: setCount(prev => prev + 1)' },
      { label: 'C', text: 'Use a setTimeout before calling setCount(count + 1)' },
      { label: 'D', text: 'Call forceUpdate() immediately after updating the variable' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Direct state mutation does not trigger re-renders and breaks component synchronization.',
      B: 'Passing a functional updater (prev => prev + 1) ensures React uses the most recent, queued state value, preventing stale state in batched updates.',
      C: 'Adding timeouts introduces race conditions and does not solve asynchronous state batching.',
      D: 'forceUpdate() is an anti-pattern in modern functional React and does not fix state race conditions.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'When does a useEffect hook with an empty dependency array [] run?',
    options: [
      { label: 'A', text: 'On every single component re-render' },
      { label: 'B', text: 'Only once, immediately after the initial mount of the component' },
      { label: 'C', text: 'Every time any prop or state changes in the component' },
      { label: 'D', text: 'Only right before the component unmounts' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'A useEffect without any dependency array runs on every render, not one with an empty array [].',
      B: 'An empty dependency array [] tells React that the effect does not depend on any changing values, so it executes exactly once after the initial render (mount).',
      C: 'An effect with listed dependencies [propA, stateB] runs when those change, not an empty array.',
      D: 'The cleanup function inside useEffect runs before unmount, but the effect itself runs after mount.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'What is the purpose of returning a function from inside a useEffect hook?',
    options: [
      { label: 'A', text: 'To return the render JSX of the component' },
      { label: 'B', text: 'To perform cleanup (e.g., unsubscribing, clearing timers) before unmounting or re-running' },
      { label: 'C', text: 'To make the effect run asynchronously in a web worker' },
      { label: 'D', text: 'To trigger an immediate error boundary' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'The component itself returns JSX, while useEffect returns either undefined or a cleanup function.',
      B: 'The function returned by useEffect is the cleanup function. React invokes it before re-executing the effect and when the component unmounts to prevent memory leaks.',
      C: 'React effects execute on the main thread; returning a function does not spawn a web worker.',
      D: 'Error boundaries catch rendering errors via componentDidCatch or getDerivedStateFromError, not effect returns.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'Which React Hook allows a component to consume values provided by a React Context without prop drilling?',
    options: [
      { label: 'A', text: 'useContext' },
      { label: 'B', text: 'useReducer' },
      { label: 'C', text: 'useRef' },
      { label: 'D', text: 'useMemo' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'useContext accepts a Context object and returns the current context value provided by the nearest ancestor <Context.Provider>.',
      B: 'useReducer is an alternative to useState for managing complex local component state transitions.',
      C: 'useRef returns a mutable ref object that persists across renders without triggering re-renders.',
      D: 'useMemo memoizes the result of an expensive calculation between renders.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'What characterizes a "controlled component" in React form handling?',
    options: [
      { label: 'A', text: 'The form element manages its own internal state via the DOM.' },
      { label: 'B', text: 'The form element\'s value is driven by React state and updated via an onChange handler.' },
      { label: 'C', text: 'The component can only be rendered by administrators.' },
      { label: 'D', text: 'The form element uses standard HTML5 submit actions without JavaScript.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'An element that manages its own state in the DOM (accessed using refs) is known as an uncontrolled component.',
      B: 'In a controlled component, the input value is bound directly to React state (value={state}) and changes through an event handler (onChange={e => setState(...)}) providing a single source of truth.',
      C: 'Controlled components have nothing to do with authorization or admin privileges.',
      D: 'Controlled components intercept form submission via JavaScript (e.preventDefault()).',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'In React Router v6, which hook is used to programmatically navigate to a different route?',
    options: [
      { label: 'A', text: 'useHistory' },
      { label: 'B', text: 'useNavigate' },
      { label: 'C', text: 'useRouter' },
      { label: 'D', text: 'useRedirect' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'useHistory was used in React Router v5 and was replaced in React Router v6.',
      B: 'In React Router v6, useNavigate returns a navigate function (e.g., navigate("/result")) used for imperative navigation.',
      C: 'useRouter is a Next.js routing hook, not part of standard react-router-dom.',
      D: 'useRedirect does not exist in standard react-router-dom; <Navigate to="..." /> or useNavigate() are used instead.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'How do you extract URL route parameters (e.g., the id in "/unit/:unitNumber") in React Router?',
    options: [
      { label: 'A', text: 'useParams' },
      { label: 'B', text: 'useSearchParams' },
      { label: 'C', text: 'useLocation' },
      { label: 'D', text: 'useRouteMatch' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'useParams returns an object of key/value pairs of dynamic URL path parameters matched by the <Route path="...">.',
      B: 'useSearchParams is used for reading and modifying URL query strings (e.g., ?search=query), not path parameters.',
      C: 'useLocation returns the current location object representing the full URL pathname, search, and hash.',
      D: 'useRouteMatch was a v5 hook deprecated in React Router v6.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'What is a key difference between Axios and the native window.fetch API?',
    options: [
      { label: 'A', text: 'Fetch automatically converts response bodies to JSON, while Axios requires res.json().' },
      { label: 'B', text: 'Axios automatically transforms JSON data and rejects HTTP error status codes (e.g., 404, 500) as errors, while fetch does not reject on HTTP errors.' },
      { label: 'C', text: 'Fetch supports request cancellation, while Axios cannot cancel requests.' },
      { label: 'D', text: 'Axios works only in Node.js backends and cannot run inside browser React apps.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'The reverse is true: fetch requires calling response.json() explicitly, whereas Axios parses JSON responses automatically.',
      B: 'Axios automatically parses JSON responses and rejects promises when status codes fall outside 2xx, whereas fetch resolves successfully on 4xx/5xx unless a network failure occurs.',
      C: 'Both Axios (via AbortController/CancelToken) and fetch (via AbortController) support request cancellation.',
      D: 'Axios is isomorphic and runs seamlessly in both browser environments and Node.js.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'Why should you avoid using array index as the "key" prop when rendering dynamic lists in React?',
    options: [
      { label: 'A', text: 'Because React throws a fatal runtime exception if indexes are used.' },
      { label: 'B', text: 'Because reordering, adding, or deleting items can cause component state bugs and inefficient re-renders.' },
      { label: 'C', text: 'Because array indexes are not strings.' },
      { label: 'D', text: 'Because keys are only permitted on HTML <button> elements.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'React allows index keys and only logs a warning in development when no keys are provided.',
      B: 'When items are filtered, sorted, or removed, index keys change for surviving items, confusing React\'s virtual DOM reconciliation and leading to stale input values or visual bugs.',
      C: 'React keys can be either numbers or strings.',
      D: 'Keys are required on all list item elements generated within loops or map calls.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'What is the concept of "Lifting State Up" in React?',
    options: [
      { label: 'A', text: 'Moving state to the browser window global object.' },
      { label: 'B', text: 'Moving shared state up to the closest common ancestor of the components that need it.' },
      { label: 'C', text: 'Storing state directly inside the DOM elements.' },
      { label: 'D', text: 'Converting local component state into backend database records.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Storing state on the window object breaks React\'s declarative model and lifecycle.',
      B: 'Lifting state up means identifying the closest common parent component of two or more siblings, holding state there, and passing it down via props.',
      C: 'React virtual DOM exists specifically to avoid storing application state inside raw DOM nodes.',
      D: 'Lifting state is a clientside component architecture pattern, not a database persistence mechanism.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'Which React hook is ideal for holding a mutable value that does NOT trigger a re-render when changed?',
    options: [
      { label: 'A', text: 'useState' },
      { label: 'B', text: 'useRef' },
      { label: 'C', text: 'useMemo' },
      { label: 'D', text: 'useCallback' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Updating useState causes React to re-render the component to reflect changes.',
      B: 'useRef returns a plain JavaScript object with a .current property that can be mutated at any time without causing a component re-render.',
      C: 'useMemo recalculates memoized values during rendering when its dependencies change.',
      D: 'useCallback returns a memoized callback function definition to prevent re-creation between renders.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'What is the result of the following conditional rendering expression when "count" is 0?\n<div>{count && <span>Items: {count}</span>}</div>',
    options: [
      { label: 'A', text: 'It renders nothing (blank).' },
      { label: 'B', text: 'It renders "0" on the screen.' },
      { label: 'C', text: 'It renders "Items: 0".' },
      { label: 'D', text: 'It throws a TypeError.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'In JavaScript, 0 is falsy, so the && expression short-circuits and evaluates to 0, which React renders as text.',
      B: 'Because 0 is a falsy number (not boolean false), JavaScript evaluates 0 && <span/> to 0. React renders numbers directly, printing "0" onto the screen.',
      C: 'The span is not rendered because 0 short-circuits the logical AND operator.',
      D: 'This is standard JavaScript behavior and does not throw an error.',
    },
    difficulty: 'hard',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'In React Context API, what component is used to wrap child components and supply the context value?',
    options: [
      { label: 'A', text: '<Context.Consumer>' },
      { label: 'B', text: '<Context.Provider>' },
      { label: 'C', text: '<Context.Wrapper>' },
      { label: 'D', text: '<Context.Container>' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: '<Context.Consumer> is an older render-prop pattern used to read context values, not supply them.',
      B: '<Context.Provider value={...}> is the built-in component that makes context values available to all descendant components.',
      C: '<Context.Wrapper> is not a valid React Context component.',
      D: '<Context.Container> is not a standard React API component.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    questionText: 'What hook should be used to memoize an expensive calculation so it only recalculates when specific inputs change?',
    options: [
      { label: 'A', text: 'useCallback' },
      { label: 'B', text: 'useMemo' },
      { label: 'C', text: 'useEffect' },
      { label: 'D', text: 'useLayoutEffect' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'useCallback memoizes a function definition instance, whereas useMemo memoizes the computed return value.',
      B: 'useMemo calls its factory function and caches the computed return value, recalculating it only when dependencies in the dependency array change.',
      C: 'useEffect runs side-effects after paint and does not return memoized values to the render pass.',
      D: 'useLayoutEffect runs synchronously immediately after DOM mutations before the browser paints.',
    },
    difficulty: 'medium',
  },

  // =========================================================================
  // UNIT 3: Backend Development with Node.js and Express (15 Questions)
  // =========================================================================
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'Which runtime architecture allows Node.js to handle thousands of concurrent connections on a single thread?',
    options: [
      { label: 'A', text: 'Multi-threaded synchronous blocking I/O' },
      { label: 'B', text: 'Event-driven, non-blocking asynchronous I/O with libuv' },
      { label: 'C', text: 'Process-per-connection Apache model' },
      { label: 'D', text: 'Pure in-memory SQL execution engine' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Traditional servers like older Apache models use multi-threaded blocking I/O, which consumes large memory per thread.',
      B: 'Node.js uses an event loop backed by the C library libuv, offloading I/O operations to the OS kernel and worker pool asynchronously without blocking the main event thread.',
      C: 'Node.js explicitly avoids the overhead of spawning a new process for each connection.',
      D: 'Node.js is a general-purpose JavaScript runtime, not a database engine.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'In package.json, what is the key difference between "dependencies" and "devDependencies"?',
    options: [
      { label: 'A', text: 'devDependencies are installed only when running npm test.' },
      { label: 'B', text: 'dependencies are needed in production runtime, while devDependencies are only needed for local development and build steps.' },
      { label: 'C', text: 'dependencies are open-source, whereas devDependencies are proprietary.' },
      { label: 'D', text: 'There is no difference; npm installs both identically in all environments.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'devDependencies are installed on any normal "npm install" unless running in production mode (NODE_ENV=production or --omit=dev).',
      B: 'dependencies (e.g., express, mongoose) are necessary for running the application in production. devDependencies (e.g., nodemon, test runners) are only used during development.',
      C: 'Both sections reference open-source npm packages.',
      D: 'Production deployment tools skip devDependencies to keep container images lean and secure.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'Which REST architectural constraint states that every client request must contain all information required to understand and process the request?',
    options: [
      { label: 'A', text: 'Statelessness' },
      { label: 'B', text: 'Stateful Sessions' },
      { label: 'C', text: 'Layered Cache Exclusion' },
      { label: 'D', text: 'Coupled Interfaces' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'Statelessness mandates that the server must not store any client session context between requests; each request must carry its own authentication and payload data.',
      B: 'Stateful sessions violate the statelessness constraint of true REST architectures.',
      C: 'Layered Cache Exclusion is a fabricated term; REST encourages explicit caching.',
      D: 'REST mandates uniform interfaces rather than coupled interfaces.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'How do you extract the value of "unitNumber" from a route defined as app.get("/api/questions/:unitNumber", ...) in Express?',
    options: [
      { label: 'A', text: 'req.body.unitNumber' },
      { label: 'B', text: 'req.query.unitNumber' },
      { label: 'C', text: 'req.params.unitNumber' },
      { label: 'D', text: 'req.headers.unitNumber' },
    ],
    correctAnswer: 'C',
    explanations: {
      A: 'req.body contains parsed payload data sent in POST/PUT request bodies.',
      B: 'req.query contains URL query parameters after the question mark (e.g., ?unitNumber=1).',
      C: 'Route parameters defined with a colon (:unitNumber) are extracted using the req.params object.',
      D: 'req.headers contains HTTP request headers (like authorization or content-type).',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'What is the role of the "next" function in an Express middleware function?',
    options: [
      { label: 'A', text: 'It restarts the Express server.' },
      { label: 'B', text: 'It passes control to the next middleware or route handler in the execution pipeline.' },
      { label: 'C', text: 'It sends an immediate HTTP 200 response to the client.' },
      { label: 'D', text: 'It navigates to the next page in the browser.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Express middleware cannot restart the server process.',
      B: 'Calling next() hands off execution to the subsequent middleware function in the stack. If next() is omitted and no response is sent, the request hangs.',
      C: 'res.send() or res.json() sends the HTTP response, not next().',
      D: 'Express runs on the server and does not control clientside browser routing.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'Which built-in Express middleware is required to parse incoming JSON payloads in request bodies?',
    options: [
      { label: 'A', text: 'app.use(express.static())' },
      { label: 'B', text: 'app.use(express.json())' },
      { label: 'C', text: 'app.use(express.urlencoded())' },
      { label: 'D', text: 'app.use(express.bodyParser())' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'express.static serves static assets (HTML, images, CSS) from a directory.',
      B: 'express.json() parses incoming requests with JSON payloads and populates req.body with the parsed JavaScript object.',
      C: 'express.urlencoded() parses URL-encoded bodies from HTML form submissions.',
      D: 'bodyParser was separated from Express core in older versions, and express.json() is now standard in modern Express.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'How many arguments must an Express error-handling middleware function define to be recognized by Express?',
    options: [
      { label: 'A', text: 'Two: (req, res)' },
      { label: 'B', text: 'Three: (req, res, next)' },
      { label: 'C', text: 'Four: (err, req, res, next)' },
      { label: 'D', text: 'One: (err)' },
    ],
    correctAnswer: 'C',
    explanations: {
      A: 'Two arguments represent a standard route handler.',
      B: 'Three arguments represent regular middleware.',
      C: 'Express determines middleware type by checking function.length. Error-handling middleware must explicitly declare exactly 4 arguments: (err, req, res, next).',
      D: 'A single argument function is invalid for Express error middleware.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'What is the primary difference in data modeling between MongoDB and MySQL?',
    options: [
      { label: 'A', text: 'MongoDB stores records in tables with fixed rows and columns, while MySQL uses JSON.' },
      { label: 'B', text: 'MongoDB stores data as flexible BSON/JSON-like documents in collections, whereas MySQL stores data in structured relational tables with schemas.' },
      { label: 'C', text: 'MySQL is a NoSQL document store, while MongoDB is a pure relational database.' },
      { label: 'D', text: 'MongoDB cannot store numbers or dates.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'This describes MySQL tables and inverts MongoDB\'s document structure.',
      B: 'MongoDB is a NoSQL document database storing semi-structured BSON documents in collections, whereas MySQL is a relational database relying on strict schemas, tables, and foreign keys.',
      C: 'MySQL is relational (SQL); MongoDB is non-relational (NoSQL).',
      D: 'MongoDB supports rich BSON data types including integers, 64-bit floats, strings, objects, and dates.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'What is MongoDB Atlas?',
    options: [
      { label: 'A', text: 'A local desktop graphical user interface for SQLite' },
      { label: 'B', text: 'A fully managed multi-cloud database service for MongoDB in the cloud' },
      { label: 'C', text: 'An npm package used to compile TypeScript code' },
      { label: 'D', text: 'A testing framework for React components' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'MongoDB Atlas is not a local SQLite tool (tools like Compass or TablePlus are GUIs).',
      B: 'MongoDB Atlas is MongoDB\'s official cloud Database-as-a-Service (DBaaS), offering automated provisioning, scaling, clustering, and security across AWS, Azure, and Google Cloud.',
      C: 'The TypeScript compiler is "tsc", not Atlas.',
      D: 'Testing frameworks for React include Jest and Vitest, not MongoDB Atlas.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'In Mongoose, what is the difference between a "Schema" and a "Model"?',
    options: [
      { label: 'A', text: 'A Schema creates database indexes, while a Model connects to the network.' },
      { label: 'B', text: 'A Schema defines the document structure and rules, while a Model provides the interface to query and perform CRUD operations on the database collection.' },
      { label: 'C', text: 'Models are only used in frontend React, while Schemas are used in backend Express.' },
      { label: 'D', text: 'There is no difference; they are exact synonyms in Mongoose.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Schemas define paths and index rules, but the Model interacts with the actual database.',
      B: 'A Mongoose Schema defines document shapes, types, defaults, and validators. A Model is a compiled constructor derived from the schema providing query methods (find, create, save).',
      C: 'Both Schemas and Models are backend Mongoose constructs running in Node.js.',
      D: 'They serve distinct purposes: Schema is the blueprint, Model is the active database interface.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'Which HTTP status code is most appropriate when a new quiz result is successfully created on the server?',
    options: [
      { label: 'A', text: '200 OK' },
      { label: 'B', text: '201 Created' },
      { label: 'C', text: '204 No Content' },
      { label: 'D', text: '304 Not Modified' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: '200 OK signifies standard success for retrieval (GET) or updates, but 201 is the standard specific code for resource creation.',
      B: 'HTTP 201 Created indicates that the request succeeded and led to the creation of a new resource (such as saving a quiz submission in the database).',
      C: '204 No Content indicates success without any response body returned.',
      D: '304 Not Modified indicates the cached client representation is still fresh.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'When testing a POST request in Postman with JSON data, which request header is automatically set?',
    options: [
      { label: 'A', text: 'Accept: text/html' },
      { label: 'B', text: 'Content-Type: application/json' },
      { label: 'C', text: 'Authorization: Bearer undefined' },
      { label: 'D', text: 'User-Agent: Postman-Only' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'text/html indicates web browser HTML documents.',
      B: 'Selecting the "raw" -> "JSON" body type in Postman automatically configures the "Content-Type: application/json" header, informing Express to parse the body with express.json().',
      C: 'Authorization headers must be explicitly configured or configured in the Auth tab.',
      D: 'While Postman sets its User-Agent, Content-Type is the critical header for JSON payload processing.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'Which Mongoose query method returns plain, lightweight JavaScript objects instead of heavy Mongoose Documents, dramatically improving read performance?',
    options: [
      { label: 'A', text: '.fast()' },
      { label: 'B', text: '.lean()' },
      { label: 'C', text: '.raw()' },
      { label: 'D', text: '.toObject()' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: '.fast() is not a valid Mongoose query method.',
      B: 'Appending .lean() to a Mongoose query skips instantiating full Mongoose Documents (with change tracking, getters, and methods), returning high-performance plain JavaScript objects.',
      C: '.raw() is used in query builders like Knex or Objection, not Mongoose.',
      D: '.toObject() converts an existing Mongoose Document instance after it has already been loaded with Mongoose overhead.',
    },
    difficulty: 'hard',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'What happens if an asynchronous route handler throws an unhandled rejection without a try/catch or async handler in Express 4?',
    options: [
      { label: 'A', text: 'Express automatically catches it and returns a 500 error.' },
      { label: 'B', text: 'The request hangs indefinitely and the Node process may crash with an UnhandledPromiseRejection.' },
      { label: 'C', text: 'The server automatically rolls back all database changes.' },
      { label: 'D', text: 'The client receives a 404 Not Found response.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Express 4 does not automatically catch unhandled promise rejections inside async functions; you must wrap in try/catch and invoke next(error).',
      B: 'In Express 4, an uncaught error in an async function fails to reach next(), leaving the client connection hanging until timeout, and modern Node.js terminates the process on unhandled rejections.',
      C: 'MongoDB does not automatically roll back unless managed inside explicit replica-set transactions.',
      D: 'A 404 is only emitted when no matching route exists, not on unhandled async crashes.',
    },
    difficulty: 'hard',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    questionText: 'Which HTTP method should be used according to REST conventions when replacing an entire resource versus updating specific fields?',
    options: [
      { label: 'A', text: 'PUT for full replacement, PATCH for partial updates' },
      { label: 'B', text: 'PATCH for full replacement, PUT for partial updates' },
      { label: 'C', text: 'POST for full replacement, GET for partial updates' },
      { label: 'D', text: 'DELETE for full replacement, PUT for partial updates' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'HTTP PUT is idempotent and semantics imply full resource replacement. HTTP PATCH is designated for partial modifications to an existing resource.',
      B: 'This inverts the RFC HTTP specifications for PUT and PATCH.',
      C: 'POST is for creating new resources or non-idempotent actions; GET is safe and read-only.',
      D: 'DELETE deletes a resource, not replaces it.',
    },
    difficulty: 'medium',
  },

  // =========================================================================
  // UNIT 4: Web Application Security and Authentication (15 Questions)
  // =========================================================================
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What are the three distinct components separated by dots that comprise a JSON Web Token (JWT)?',
    options: [
      { label: 'A', text: 'Username, Password, and Salt' },
      { label: 'B', text: 'Header, Payload, and Signature' },
      { label: 'C', text: 'Protocol, Hostname, and Port' },
      { label: 'D', text: 'Public Key, Private Key, and Certificate' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Storing passwords in JWTs is a severe security vulnerability; JWTs do not contain user passwords.',
      B: 'A JWT consists of three Base64URL-encoded parts: the Header (algorithm & token type), Payload (claims and user data), and Signature (verifies integrity with a secret key).',
      C: 'Protocol, hostname, and port are components of a URL, not a JWT.',
      D: 'Keys are used to sign and verify tokens, but are not the three parts of the token string itself.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'Why should JWTs or sensitive authentication tokens NEVER be stored in browser localStorage if XSS vulnerabilities exist?',
    options: [
      { label: 'A', text: 'Because localStorage data expires after 5 minutes.' },
      { label: 'B', text: 'Because any malicious JavaScript injected via XSS can access and steal tokens from localStorage.' },
      { label: 'C', text: 'Because localStorage is encrypted by default.' },
      { label: 'D', text: 'Because browsers transmit localStorage automatically with every HTTP request.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'localStorage data persists indefinitely until cleared explicitly by the user or script.',
      B: 'localStorage is fully accessible to any JavaScript running on the page. If an attacker injects code through Cross-Site Scripting (XSS), they can easily extract window.localStorage tokens.',
      C: 'localStorage is stored in plaintext on disk without encryption.',
      D: 'Cookies are sent automatically with HTTP requests, not localStorage.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What cookie attribute prevents client-side JavaScript (document.cookie) from accessing an authentication cookie?',
    options: [
      { label: 'A', text: 'Secure' },
      { label: 'B', text: 'SameSite=Lax' },
      { label: 'C', text: 'HttpOnly' },
      { label: 'D', text: 'Domain' },
    ],
    correctAnswer: 'C',
    explanations: {
      A: "'Secure' ensures the cookie is only transmitted over encrypted HTTPS connections, but doesn't block JavaScript access.",
      B: "'SameSite' mitigates Cross-Site Request Forgery (CSRF) attacks by restricting cross-site transmission.",
      C: "'HttpOnly' blocks client-side scripts from reading the cookie via document.cookie, mitigating session hijacking via XSS.",
      D: "'Domain' specifies which hosts are allowed to receive the cookie.",
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What is the purpose of adding "salt" when hashing passwords with bcrypt?',
    options: [
      { label: 'A', text: 'To compress the password into fewer bytes' },
      { label: 'B', text: 'To defend against precomputed rainbow table attacks by ensuring identical passwords produce different hashes' },
      { label: 'C', text: 'To encrypt the password symmetrically so it can be decrypted later' },
      { label: 'D', text: 'To automatically send the password to the user\'s email' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Salts increase computational work and entropy rather than compressing data.',
      B: 'A cryptographic salt is a unique random string appended before hashing. It prevents attackers from using precomputed rainbow tables or dictionary attacks because two users with the same password will have completely different hashes.',
      C: 'Hashing is a one-way mathematical function; passwords cannot and should never be decrypted.',
      D: 'Salting has no connection to email protocols.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'Why is it dangerous to use fast cryptographic hashes like MD5 or SHA-256 for user password storage?',
    options: [
      { label: 'A', text: 'They are proprietary algorithms owned by corporations.' },
      { label: 'B', text: 'Modern GPUs can calculate billions of SHA-256/MD5 hashes per second, making brute-force cracking trivial.' },
      { label: 'C', text: 'They produce hashes that are too long for database strings.' },
      { label: 'D', text: 'Node.js does not support SHA-256.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'MD5 and SHA-256 are open standard cryptographic algorithms.',
      B: 'MD5 and SHA-256 were designed for speed in checksums and digital signatures. Because they are fast, attackers with GPUs can test billions of guesses per second. Password hashing requires adaptive, slow algorithms like bcrypt or argon2.',
      C: 'MD5 is 32 hexadecimal characters and SHA-256 is 64 characters, fitting easily in standard columns.',
      D: 'Node.js has native crypto modules supporting SHA-256.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What is Role-Based Access Control (RBAC)?',
    options: [
      { label: 'A', text: 'An authentication mechanism that allows anyone with an email to access all routes' },
      { label: 'B', text: 'An authorization approach where system access is restricted based on defined user roles and privileges (e.g., student, instructor, admin)' },
      { label: 'C', text: 'A database query language for MongoDB' },
      { label: 'D', text: 'A network firewall hardware device' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Allowing universal access is an absence of access control, the opposite of RBAC.',
      B: 'RBAC assigns permissions to specific roles (e.g., "admin", "student"), and users are assigned roles. Middleware verifies if the user\'s role has permission to access the requested resource.',
      C: 'RBAC is an authorization pattern, not a database query language.',
      D: 'RBAC is an application-level security architecture, not physical hardware.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What HTTP mechanism does the browser use to verify if a cross-origin server allows a complex request before sending it?',
    options: [
      { label: 'A', text: 'A GET verification ping' },
      { label: 'B', text: 'A CORS preflight request using the OPTIONS HTTP method' },
      { label: 'C', text: 'A WebSocket handshake' },
      { label: 'D', text: 'An ICMP echo request' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Browsers do not use GET for preflight checks because GET may have side effects or be disallowed.',
      B: 'For requests with custom headers or methods like PUT/DELETE/POST (with application/json), browsers send an automatic preflight OPTIONS request to verify CORS permission headers.',
      C: 'WebSockets use an HTTP Upgrade request, not CORS preflight.',
      D: 'ICMP is a network layer ping protocol and cannot be initiated by browser JavaScript.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What security risk does Rate Limiting primarily defend against on login or quiz submission endpoints?',
    options: [
      { label: 'A', text: 'SQL Injection' },
      { label: 'B', text: 'Brute-force credential stuffing and Denial-of-Service (DoS) abuse' },
      { label: 'C', text: 'Cross-Site Scripting (XSS)' },
      { label: 'D', text: 'CSS styling conflicts' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'SQL Injection is prevented by parameterized queries and ORMs/ODMs.',
      B: 'Rate limiting caps the number of requests an IP address can make within a time window (e.g., 5 login attempts per 15 minutes), preventing automated brute-force attacks and resource exhaustion.',
      C: 'XSS is prevented by context-aware output encoding and input sanitization.',
      D: 'CSS styling conflicts are solved by CSS scoping and modular design.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'Why should environment variables (.env files) containing database credentials NEVER be committed to a public GitHub repository?',
    options: [
      { label: 'A', text: 'Because .env files make git repositories run slower.' },
      { label: 'B', text: 'Because anyone can view the repository, extract your credentials, and compromise or delete your database.' },
      { label: 'C', text: 'Because Node.js cannot read .env files if committed to Git.' },
      { label: 'D', text: 'Because GitHub automatically deletes repositories containing .env files.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'A small text file has negligible impact on Git performance.',
      B: 'Committing credentials exposes database URLs, passwords, and API keys to automated scrapers and malicious actors who can compromise, steal, or delete data within seconds.',
      C: 'Node.js reads files from the local filesystem regardless of whether Git tracked them.',
      D: 'GitHub does not automatically delete repos; scanning bots actively look for leaked secrets.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'In Mongoose, how can you permanently prevent the "password" field from being returned in user queries by default?',
    options: [
      { label: 'A', text: 'password: { type: String, select: false }' },
      { label: 'B', text: 'password: { type: String, hidden: true }' },
      { label: 'C', text: 'password: { type: String, private: true }' },
      { label: 'D', text: 'Delete the password field from the schema completely' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'Setting select: false in the Mongoose schema property definition excludes the field from query projections by default, preventing accidental credential exposure in JSON responses.',
      B: "'hidden' is not a native Mongoose schema type option.",
      C: "'private' is a JavaScript/TypeScript keyword, not a Mongoose schema option.",
      D: 'Deleting the password field prevents storing user credentials in the database.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What is a Cross-Site Scripting (XSS) attack?',
    options: [
      { label: 'A', text: 'An attacker submits malicious SQL commands inside input forms.' },
      { label: 'B', text: 'An attacker injects malicious client-side JavaScript that executes inside victims\' browsers.' },
      { label: 'C', text: 'An attacker floods the server network with UDP packets.' },
      { label: 'D', text: 'An attacker intercepts unencrypted Wi-Fi radio waves.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Submitting SQL commands in form fields is SQL Injection (SQLi), not XSS.',
      B: 'XSS occurs when an application includes untrusted user input in web pages without proper validation or encoding, allowing malicious scripts to execute in the victim\'s browser.',
      C: 'Flooding with UDP packets is a Denial-of-Service (DDoS) attack.',
      D: 'Intercepting unencrypted Wi-Fi is eavesdropping / Man-in-the-Middle (MitM).',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What popular Express middleware package helps secure HTTP headers (e.g., Content-Security-Policy, X-Frame-Options, Strict-Transport-Security)?',
    options: [
      { label: 'A', text: 'helmet' },
      { label: 'B', text: 'cors' },
      { label: 'C', text: 'morgan' },
      { label: 'D', text: 'bcrypt' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'Helmet is the standard security middleware for Express that sets essential HTTP response headers to protect against clickjacking, XSS, and MIME-sniffing.',
      B: 'CORS configures Cross-Origin Resource Sharing headers, not general security headers.',
      C: 'Morgan is an HTTP request logging middleware.',
      D: 'Bcrypt is a password hashing library.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'How should authorization tokens typically be transmitted from a frontend client in HTTP request headers?',
    options: [
      { label: 'A', text: 'Authorization: Bearer <token>' },
      { label: 'B', text: 'Token: Key=<token>' },
      { label: 'C', text: 'Cookie-Header: <token>' },
      { label: 'D', text: 'X-Password: <token>' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'Standard RFC 6750 specifies using the "Authorization" HTTP header formatted as "Bearer <token>" for bearer tokens like JWT.',
      B: 'Non-standard custom headers like "Token: Key=" are discouraged in standard REST APIs.',
      C: 'Cookie headers are managed by the browser Cookie header, not "Cookie-Header".',
      D: 'Passing tokens in a header named "X-Password" is non-standard and semantically incorrect.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What is the main security benefit of using short-lived Access Tokens paired with long-lived Refresh Tokens?',
    options: [
      { label: 'A', text: 'It completely eliminates the need for database storage.' },
      { label: 'B', text: 'If an access token is intercepted, the window of vulnerability is minimized, and refresh tokens can be revoked on the server.' },
      { label: 'C', text: 'It speeds up network latency by 50%.' },
      { label: 'D', text: 'Refresh tokens automatically bypass CORS requirements.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Refresh token rotation typically requires tracking or blacklisting in a database or Redis cache.',
      B: 'Short-lived access tokens (e.g., 15 minutes) limit the damage if leaked. The server can revoke the refresh token if suspicious activity is detected, cutting off unauthorized access.',
      C: 'Token renewal adds occasional HTTP round-trips; it does not accelerate network latency.',
      D: 'CORS policies apply equally to all HTTP requests regardless of token strategy.',
    },
    difficulty: 'hard',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    questionText: 'What is NoSQL Injection in MongoDB and how can it be prevented in Express applications?',
    options: [
      { label: 'A', text: 'Injecting raw CSS into MongoDB collections; prevented by using Sass.' },
      { label: 'B', text: 'Attackers submitting query operator objects (e.g., {"$gt": ""}) in JSON inputs; prevented by sanitizing inputs and using Mongoose schema casting.' },
      { label: 'C', text: 'Attackers running DROP TABLE commands; prevented by MySQL triggers.' },
      { label: 'D', text: 'MongoDB is immune to all forms of injection.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'NoSQL injection involves malicious database query manipulation, not CSS.',
      B: 'If inputs like req.body.password are passed as { "$gt": "" }, MongoDB query operators could match documents without matching the password. Sanitizing inputs (e.g., with express-mongo-sanitize) and strict Mongoose schemas prevents this.',
      C: 'MongoDB does not use SQL commands or tables.',
      D: 'No database is completely immune to injection without proper input validation and sanitization.',
    },
    difficulty: 'hard',
  },

  // =========================================================================
  // UNIT 5: Modern Web Practices (15 Questions)
  // =========================================================================
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What is the primary difference between Client-Side Rendering (CSR) and Server-Side Rendering (SSR)?',
    options: [
      { label: 'A', text: 'In CSR, HTML is fully generated on the server for each request, while in SSR, the browser renders empty HTML.' },
      { label: 'B', text: 'In SSR, the server generates the full HTML on every request, improving SEO and initial page load, while in CSR the browser builds the DOM using JavaScript.' },
      { label: 'C', text: 'CSR is only used for mobile apps, while SSR is only used on desktops.' },
      { label: 'D', text: 'SSR cannot use CSS or images.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'This statement completely reverses the definitions of CSR and SSR.',
      B: 'Server-Side Rendering (SSR) compiles HTML on the server before sending it to the client, giving immediate content for users and search engine bots. CSR downloads an initial blank HTML shell and executes JS to render.',
      C: 'Both CSR and SSR are web rendering techniques applicable to any device with a web browser.',
      D: 'SSR frameworks like Next.js fully support modern styling, CSS modules, and optimized images.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What is Static Site Generation (SSG)?',
    options: [
      { label: 'A', text: 'Generating HTML pages at build time ahead of time, serving pre-rendered pages via CDN' },
      { label: 'B', text: 'Generating HTML on the fly for every single incoming request from users' },
      { label: 'C', text: 'Running an Express server that never restarts' },
      { label: 'D', text: 'Converting dynamic database tables into static text files' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'In Static Site Generation (SSG), HTML pages are pre-rendered at build time. Because pages are static files, they can be deployed and cached globally on CDNs with optimal speed and near-zero server load.',
      B: 'Generating HTML dynamically for every incoming request is Server-Side Rendering (SSR).',
      C: 'Server process longevity is managed by process managers like PM2, not SSG.',
      D: 'SSG builds web page markup from content and templates, not database tables into text files.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'In GraphQL, which operation is used to modify or write data (equivalent to POST, PUT, or DELETE in REST)?',
    options: [
      { label: 'A', text: 'Query' },
      { label: 'B', text: 'Mutation' },
      { label: 'C', text: 'Subscription' },
      { label: 'D', text: 'Fragment' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'A GraphQL Query is used strictly for fetching data (read operations), analogous to HTTP GET in REST.',
      B: 'A GraphQL Mutation is explicitly used to create, update, or delete data on the server, ensuring clear distinction between read and write operations.',
      C: 'A Subscription maintains a real-time connection (usually over WebSockets) for streaming data updates.',
      D: 'A Fragment is a reusable selection set of fields in GraphQL queries.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What major problem of REST APIs does GraphQL solve regarding data fetching?',
    options: [
      { label: 'A', text: 'It completely eliminates the need for internet connectivity.' },
      { label: 'B', text: 'It eliminates "over-fetching" (getting more fields than needed) and "under-fetching" (needing multiple round trips to get related data).' },
      { label: 'C', text: 'It removes the requirement for database indexes.' },
      { label: 'D', text: 'It replaces JavaScript on the backend with SQL.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'GraphQL is a network query language and still requires HTTP or WebSocket connectivity.',
      B: 'In REST, endpoints often return fixed payloads with unwanted fields (over-fetching) or require multiple endpoint calls for nested resources (under-fetching). GraphQL lets the client specify the exact shape of data needed in a single request.',
      C: 'Database indexes are database-level optimizations independent of whether APIs use REST or GraphQL.',
      D: 'GraphQL servers can be written in JavaScript, Python, Go, Java, and connect to any database.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What communication protocol does Socket.io utilize under the hood for bidirectional, low-latency communication?',
    options: [
      { label: 'A', text: 'FTP' },
      { label: 'B', text: 'WebSocket protocol with HTTP long-polling fallback' },
      { label: 'C', text: 'SMTP' },
      { label: 'D', text: 'SNMP' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'FTP is the File Transfer Protocol for file uploads, not real-time browser communication.',
      B: 'Socket.io establishes full-duplex communication primarily using WebSockets, and gracefully falls back to HTTP long-polling if WebSockets are blocked by proxies or firewalls.',
      C: 'SMTP is the protocol for transmitting emails.',
      D: 'SNMP is for network device management.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'In Socket.io, which method is used on the client to listen for custom events emitted by the server?',
    options: [
      { label: 'A', text: 'socket.emit("eventName", callback)' },
      { label: 'B', text: 'socket.on("eventName", callback)' },
      { label: 'C', text: 'socket.listen("eventName")' },
      { label: 'D', text: 'socket.subscribe("eventName")' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'socket.emit() sends an event from the client to the server, rather than receiving/listening for it.',
      B: 'socket.on(eventName, callback) registers an event listener that triggers the callback whenever the server broadcasts the matching event.',
      C: 'socket.listen() is used on the server when binding HTTP servers in older Node patterns, not on client socket instances.',
      D: 'socket.subscribe() is common in MQTT or Redis pub/sub, but standard Socket.io uses socket.on().',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What is Code Splitting in modern frontend applications?',
    options: [
      { label: 'A', text: 'Splitting your code across two different computer monitors' },
      { label: 'B', text: 'Breaking down the JavaScript bundle into smaller chunks loaded on-demand, reducing initial page load time' },
      { label: 'C', text: 'Writing half your codebase in JavaScript and half in Python' },
      { label: 'D', text: 'Compressing image files into ZIP archives' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Physical screen setups have no bearing on browser bundle delivery.',
      B: 'Code splitting uses dynamic import() to split application code into separate bundle chunks. Browsers download only the chunk needed for the current route/feature, drastically improving Largest Contentful Paint (LCP).',
      C: 'Polyglot programming is not code splitting.',
      D: 'Image compression is asset optimization, not code splitting.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'How can you implement lazy loading of a component in React using built-in React APIs?',
    options: [
      { label: 'A', text: 'const MyComponent = React.lazy(() => import("./MyComponent")); with <Suspense>' },
      { label: 'B', text: 'const MyComponent = React.defer(() => require("./MyComponent"))' },
      { label: 'C', text: 'const MyComponent = React.loadAsync("./MyComponent")' },
      { label: 'D', text: 'const MyComponent = window.import("./MyComponent")' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'React.lazy(() => import(...)) together with <React.Suspense fallback={<Loading />}> is the official React standard for dynamically importing components on demand.',
      B: 'React.defer() does not exist in the React API.',
      C: 'React.loadAsync() is not a valid React API function.',
      D: 'window.import is invalid syntax in browser JavaScript.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What does "Tree Shaking" accomplish in modern bundlers like Vite and Webpack?',
    options: [
      { label: 'A', text: 'It re-formats messy folder directory structures automatically.' },
      { label: 'B', text: 'It eliminates dead, unused code from the final production JavaScript bundle using ES module static analysis.' },
      { label: 'C', text: 'It checks code for syntactic typos and spelling mistakes.' },
      { label: 'D', text: 'It converts JSX code into TypeScript automatically.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Bundlers do not rearrange your filesystem directories.',
      B: 'Tree shaking analyzes import and export statements in ES modules at build time and strips out functions, classes, and variables that are never actually referenced or executed, shrinking bundle size.',
      C: 'Typo checking is handled by linters or IDE extensions (like cSpell).',
      D: 'Transpiling JSX is handled by Babel, SWC, or esbuild.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'Which Core Web Vital metric measures the perceived visual loading speed by measuring when the largest content element becomes visible?',
    options: [
      { label: 'A', text: 'LCP (Largest Contentful Paint)' },
      { label: 'B', text: 'INP (Interaction to Next Paint)' },
      { label: 'C', text: 'CLS (Cumulative Layout Shift)' },
      { label: 'D', text: 'TTFB (Time to First Byte)' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'Largest Contentful Paint (LCP) measures how long it takes for the largest content block (image, hero section, or text block) within the viewport to render on screen. An ideal LCP is under 2.5 seconds.',
      B: 'Interaction to Next Paint (INP) measures page responsiveness to user clicks and taps.',
      C: 'Cumulative Layout Shift (CLS) measures visual stability and unexpected layout movement during page load.',
      D: 'Time to First Byte (TTFB) measures server response time until the first byte of data reaches the browser.',
    },
    difficulty: 'medium',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What Core Web Vital measures the visual stability of a webpage and prevents elements from jumping around during page load?',
    options: [
      { label: 'A', text: 'Cumulative Layout Shift (CLS)' },
      { label: 'B', text: 'Largest Contentful Paint (LCP)' },
      { label: 'C', text: 'First Input Delay (FID)' },
      { label: 'D', text: 'First Contentful Paint (FCP)' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'Cumulative Layout Shift (CLS) quantifies how often users experience unexpected layout shifts (e.g., images without dimensions loading and pushing content down). An ideal CLS score is 0.1 or lower.',
      B: 'LCP measures render time of the primary hero content.',
      C: 'FID (now superseded by INP) measured input responsiveness on the initial click.',
      D: 'FCP measures the moment any visual element is first rendered on screen.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'In full-stack application development, what does the "Separation of Concerns" principle advocate?',
    options: [
      { label: 'A', text: 'Writing all database queries, HTML templates, and route handling in a single monolithic index.js file' },
      { label: 'B', text: 'Dividing a program into distinct sections, where each section addresses a separate concern (e.g., controllers for logic, models for data, routes for endpoints)' },
      { label: 'C', text: 'Allowing frontend components to connect directly to the MongoDB database without an API' },
      { label: 'D', text: 'Separating developers into isolated teams that never communicate' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'Consolidating everything into a single file violates separation of concerns and creates unmaintainable spaghetti code.',
      B: 'Separation of concerns organizes software into modular layers (controllers, routes, services, models, components) so each component has a single, well-defined responsibility, improving testability and maintainability.',
      C: 'Direct frontend database connections expose database credentials and are a critical security violation.',
      D: 'Separation of concerns refers to code architecture, not team isolation.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What is the purpose of an HTTP "Cache-Control: max-age=31536000, immutable" header for static assets with hashed filenames?',
    options: [
      { label: 'A', text: 'It instructs the browser to never cache the file.' },
      { label: 'B', text: 'It instructs browsers and CDNs to cache the asset for 1 year without re-validating, because any code update will generate a new unique hash in the filename.' },
      { label: 'C', text: 'It forces the browser to re-download the file on every page refresh.' },
      { label: 'D', text: 'It deletes the file from the server after 1 year.' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'To prevent caching, Cache-Control: no-store or no-cache would be used.',
      B: 'Modern build tools like Vite append content hashes to file names (e.g., app-a1b2c3.js). When files are content-hashed, browsers can cache them for 1 year (31,536,000 seconds) safely because new builds will have different URLs.',
      C: 'The "immutable" directive explicitly tells the browser not to re-validate even on reload.',
      D: 'Cache-Control headers instruct client caches, not server file deletion.',
    },
    difficulty: 'hard',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'What software design principle states that "Every piece of knowledge or logic must have a single, unambiguous representation within a system"?',
    options: [
      { label: 'A', text: 'KISS (Keep It Simple, Stupid)' },
      { label: 'B', text: 'DRY (Don\'t Repeat Yourself)' },
      { label: 'C', text: 'YAGNI (You Aren\'t Gonna Need It)' },
      { label: 'D', text: 'WET (Write Everything Twice)' },
    ],
    correctAnswer: 'B',
    explanations: {
      A: 'KISS advocates simplicity over unnecessary complexity, but is not the specific principle addressing duplication of logic.',
      B: 'DRY (Don\'t Repeat Yourself) emphasizes eliminating duplication by centralizing reusable logic into helper functions, components, and modules to avoid maintenance headaches when requirements change.',
      C: 'YAGNI cautions developers against implementing features until they are actually necessary.',
      D: 'WET is a humorous opposite of DRY, signifying duplicated and fragile code.',
    },
    difficulty: 'easy',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    questionText: 'Which HTTP header is used for conditional requests to verify whether a cached resource has changed based on a cryptographic entity tag?',
    options: [
      { label: 'A', text: 'If-None-Match with ETag' },
      { label: 'B', text: 'Content-Disposition' },
      { label: 'C', text: 'X-Powered-By' },
      { label: 'D', text: 'Accept-Encoding' },
    ],
    correctAnswer: 'A',
    explanations: {
      A: 'The server provides an ETag (entity tag) hash of the resource. On subsequent visits, the browser sends "If-None-Match: <etag>". If unchanged, the server returns 304 Not Modified with zero body bytes, saving bandwidth.',
      B: 'Content-Disposition specifies filename suggestions for file downloads.',
      C: 'X-Powered-By reveals server technology (like Express) and is often removed for security.',
      D: 'Accept-Encoding tells the server what compression algorithms (like gzip or br) the client supports.',
    },
    difficulty: 'medium',
  },
];

/**
 * Seed questions to MongoDB Atlas
 */
const seedQuestions = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri || mongoUri.includes('YOUR_USERNAME') || mongoUri.includes('YOUR_PASSWORD')) {
      console.error('\n' + '!'.repeat(70));
      console.error('❌ SEEDING FAILED: MONGODB ATLAS URL NOT CONFIGURED');
      console.error('Please open backend/.env and replace placeholder credentials with your real Atlas URI:');
      console.error('MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mcq_generator?retryWrites=true&w=majority');
      console.error('Check README.md for step-by-step Atlas setup instructions.');
      console.error('!'.repeat(70) + '\n');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB Atlas for seeding...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log(`✅ Connected to MongoDB Atlas: ${mongoose.connection.host}`);
    console.log(`📁 Target Database: ${mongoose.connection.name}`);

    // Verify questions count
    console.log(`\n📋 Total Questions to Seed: ${questionsData.length} (5 units × 15 questions)`);

    // Clean existing questions to prevent duplicates
    console.log('🧹 Clearing existing questions in "questions" collection...');
    const deleteResult = await Question.deleteMany({});
    console.log(`🗑️  Removed ${deleteResult.deletedCount} previous questions.`);

    // Insert new questions
    console.log('📥 Inserting 75 syllabus-based MCQs...');
    const insertedDocs = await Question.insertMany(questionsData);
    console.log(`✨ Successfully inserted ${insertedDocs.length} questions into MongoDB Atlas!`);

    // Breakdown report
    console.log('\n📊 SEEDING BREAKDOWN BY UNIT:');
    for (let u = 1; u <= 5; u++) {
      const count = await Question.countDocuments({ unitNumber: u });
      const sample = questionsData.find((q) => q.unitNumber === u);
      console.log(`  • Unit ${u}: "${sample.unitName}" -> ${count}/15 questions`);
    }

    console.log('\n🎉 Database seeding completed successfully! You can now start the backend with: npm run dev\n');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ SEEDING ERROR:');
    console.error(error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

export { questionsData, seedQuestions };

// Run automatically when executed directly via node seed/seedQuestions.js
if (process.argv[1] && process.argv[1].includes('seedQuestions.js')) {
  seedQuestions();
}

