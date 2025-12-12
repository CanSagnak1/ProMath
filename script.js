
const state = {
    currentExpression: '0',
    currentResult: '',
    currentMode: 'basic',
    angleMode: 'deg', // 'deg' or 'rad'
    precision: 10,
    soundEnabled: true,
    history: [],
    parenthesesOpen: 0
};


const elements = {
    expression: document.getElementById('expression'),
    result: document.getElementById('result'),
    displayContainer: document.querySelector('.display-container'),
    
    panels: {
        basic: document.getElementById('basicPanel'),
        scientific: document.getElementById('scientificPanel'),
        matrix: document.getElementById('matrixPanel'),
        solver: document.getElementById('solverPanel'),
        converter: document.getElementById('converterPanel')
    },
    
    historySidebar: document.getElementById('historySidebar'),
    settingsSidebar: document.getElementById('settingsSidebar'),
    overlay: document.getElementById('overlay'),
    
    historyContent: document.getElementById('historyContent'),
    clearHistoryBtn: document.getElementById('clearHistory'),
    
    precisionSetting: document.getElementById('precisionSetting'),
    angleUnitSetting: document.getElementById('angleUnitSetting'),
    soundSetting: document.getElementById('soundSetting'),
    
    matrixA: document.getElementById('matrixA'),
    matrixB: document.getElementById('matrixB'),
    
    linearEq: document.getElementById('linearEq'),
    quadA: document.getElementById('quadA'),
    quadB: document.getElementById('quadB'),
    quadC: document.getElementById('quadC'),
    derivativeFunc: document.getElementById('derivativeFunc'),
    
    unitType: document.getElementById('unitType'),
    fromValue: document.getElementById('fromValue'),
    toValue: document.getElementById('toValue'),
    fromUnit: document.getElementById('fromUnit'),
    toUnit: document.getElementById('toUnit'),
    
    angleMode: document.getElementById('angleMode')
};


function init() {
    loadHistory();
    loadSettings();
    setupEventListeners();
    updateDisplay();
    populateConverterUnits();
}


function setupEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchMode(btn.dataset.mode));
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', handleButtonClick);
    });
    
    document.getElementById('historyBtn').addEventListener('click', () => toggleSidebar('history'));
    document.getElementById('settingsBtn').addEventListener('click', () => toggleSidebar('settings'));
    document.getElementById('closeHistory').addEventListener('click', () => toggleSidebar('history'));
    document.getElementById('closeSettings').addEventListener('click', () => toggleSidebar('settings'));
    elements.overlay.addEventListener('click', closeSidebars);
    
    elements.clearHistoryBtn.addEventListener('click', clearHistory);
    
    elements.precisionSetting.addEventListener('change', (e) => {
        state.precision = parseInt(e.target.value);
        saveSettings();
    });
    
    elements.angleUnitSetting.addEventListener('change', (e) => {
        state.angleMode = e.target.value;
        if (elements.angleMode) {
            elements.angleMode.textContent = state.angleMode.toUpperCase();
        }
        saveSettings();
    });
    
    elements.soundSetting.addEventListener('change', (e) => {
        state.soundEnabled = e.target.checked;
        saveSettings();
    });
    
    document.querySelectorAll('[data-matrix-op]').forEach(btn => {
        btn.addEventListener('click', handleMatrixOperation);
    });
    
    document.querySelectorAll('.solver-type-btn').forEach(btn => {
        btn.addEventListener('click', handleSolverTypeChange);
    });
    
    document.querySelector('[data-action="solve-linear"]')?.addEventListener('click', solveLinearEquation);
    document.querySelector('[data-action="solve-quadratic"]')?.addEventListener('click', solveQuadraticEquation);
    document.querySelector('[data-action="calculate-derivative"]')?.addEventListener('click', calculateDerivative);
    
    elements.unitType.addEventListener('change', populateConverterUnits);
    elements.fromValue.addEventListener('input', convertUnits);
    elements.fromUnit.addEventListener('change', convertUnits);
    elements.toUnit.addEventListener('change', convertUnits);
    
    document.addEventListener('keydown', handleKeyboard);
}


function handleButtonClick(e) {
    const btn = e.currentTarget;
    const value = btn.dataset.value;
    const action = btn.dataset.action;
    
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 100);
    
    if (action) {
        handleAction(action);
    } else if (value !== undefined) {
        handleValue(value);
    }
}


function handleValue(value) {
    if (state.currentExpression === '0' && value !== '.') {
        state.currentExpression = '';
    }
    
    if (value === 'pi') {
        state.currentExpression += 'π';
    } else if (value === 'e') {
        state.currentExpression += 'e';
    } else if (value === '()') {
        if (state.parenthesesOpen > 0 && /[\d\)]$/.test(state.currentExpression)) {
            state.currentExpression += ')';
            state.parenthesesOpen--;
        } else {
            state.currentExpression += '(';
            state.parenthesesOpen++;
        }
    } else if (value === '^2') {
        state.currentExpression += '^2';
    } else {
        state.currentExpression += value;
    }
    
    updateDisplay();
    calculatePreview();
}


function handleAction(action) {
    switch (action) {
        case 'clear':
            state.currentExpression = '0';
            state.currentResult = '';
            state.parenthesesOpen = 0;
            break;
            
        case 'delete':
            if (state.currentExpression.length > 1) {
                const lastChar = state.currentExpression.slice(-1);
                if (lastChar === '(') state.parenthesesOpen--;
                if (lastChar === ')') state.parenthesesOpen++;
                state.currentExpression = state.currentExpression.slice(0, -1);
            } else {
                state.currentExpression = '0';
            }
            break;
            
        case 'percent':
            try {
                const result = evaluateExpression(state.currentExpression);
                state.currentExpression = (result / 100).toString();
            } catch (e) {
                state.currentExpression += '/100';
            }
            break;
            
        case 'equals':
            calculateResult();
            break;
            
        case 'deg-rad':
            state.angleMode = state.angleMode === 'deg' ? 'rad' : 'deg';
            elements.angleMode.textContent = state.angleMode.toUpperCase();
            saveSettings();
            break;
    }
    
    updateDisplay();
}


function evaluateExpression(expr) {
    try {
        let processedExpr = expr
            .replace(/π/g, 'pi')
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        if (state.angleMode === 'deg') {
            processedExpr = processedExpr
                .replace(/sin\(/g, 'sin((pi/180)*')
                .replace(/cos\(/g, 'cos((pi/180)*')
                .replace(/tan\(/g, 'tan((pi/180)*')
                .replace(/asin\(/g, '(180/pi)*asin(')
                .replace(/acos\(/g, '(180/pi)*acos(')
                .replace(/atan\(/g, '(180/pi)*atan(');
        }
        
        processedExpr = processedExpr.replace(/(\d+)!/g, 'factorial($1)');
        
        processedExpr = processedExpr.replace(/exp\(/g, 'e^(');
        
        const result = math.evaluate(processedExpr);
        
        if (typeof result === 'number') {
            return parseFloat(result.toPrecision(state.precision));
        }
        
        return result;
    } catch (error) {
        throw new Error('Invalid expression');
    }
}

function calculatePreview() {
    try {
        if (state.currentExpression && state.currentExpression !== '0') {
            const result = evaluateExpression(state.currentExpression);
            state.currentResult = formatResult(result);
        }
    } catch (e) {
        state.currentResult = '';
    }
}

function calculateResult() {
    try {
        const result = evaluateExpression(state.currentExpression);
        const formattedResult = formatResult(result);
        
        addToHistory(state.currentExpression, formattedResult);
        
        state.currentExpression = formattedResult.toString();
        state.currentResult = '';
        state.parenthesesOpen = 0;
        
        elements.displayContainer.classList.add('active');
        setTimeout(() => {
            elements.displayContainer.classList.remove('active');
        }, 300);
        
    } catch (error) {
        state.currentResult = 'Error';
        setTimeout(() => {
            state.currentResult = '';
            updateDisplay();
        }, 2000);
    }
}

function formatResult(result) {
    if (typeof result === 'number') {
        if (Math.abs(result) < 1e-10) return '0';
        if (Math.abs(result) > 1e10 || Math.abs(result) < 1e-6) {
            return result.toExponential(state.precision - 1);
        }
        return parseFloat(result.toPrecision(state.precision));
    }
    return result.toString();
}


function handleMatrixOperation(e) {
    const operation = e.currentTarget.dataset.matrixOp;
    
    try {
        const matrixA = math.matrix(JSON.parse(elements.matrixA.value));
        let result;
        
        switch (operation) {
            case 'determinant':
                result = math.det(matrixA);
                break;
                
            case 'inverse':
                result = math.inv(matrixA);
                break;
                
            case 'transpose':
                result = math.transpose(matrixA);
                break;
                
            case 'add':
            case 'subtract':
            case 'multiply':
                const matrixB = math.matrix(JSON.parse(elements.matrixB.value));
                if (operation === 'add') result = math.add(matrixA, matrixB);
                else if (operation === 'subtract') result = math.subtract(matrixA, matrixB);
                else result = math.multiply(matrixA, matrixB);
                break;
        }
        
        const resultStr = typeof result === 'number' 
            ? formatResult(result) 
            : JSON.stringify(result.toArray(), null, 2);
        
        state.currentExpression = `${operation.toUpperCase()}`;
        state.currentResult = resultStr;
        updateDisplay();
        
        addToHistory(`Matrix ${operation}`, resultStr);
        
    } catch (error) {
        state.currentResult = 'Matrix Error: ' + error.message;
        setTimeout(() => {
            state.currentResult = '';
            updateDisplay();
        }, 3000);
    }
}


function handleSolverTypeChange(e) {
    const solverType = e.currentTarget.dataset.solver;
    
    document.querySelectorAll('.solver-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    document.querySelectorAll('.solver-input-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    document.getElementById(`${solverType}Solver`).classList.remove('hidden');
}

function solveLinearEquation() {
    try {
        const equation = elements.linearEq.value;
        const [left, right] = equation.split('=');
        
        const expr = `${left} - (${right})`;
        const solution = math.evaluate(`solve(${expr}, x)`);
        
        state.currentExpression = equation;
        state.currentResult = `x = ${formatResult(solution)}`;
        
        updateDisplay();
        addToHistory(`Solve: ${equation}`, state.currentResult);
        
    } catch (error) {
        state.currentResult = 'Solver Error: ' + error.message;
        setTimeout(() => {
            state.currentResult = '';
            updateDisplay();
        }, 3000);
    }
}

function solveQuadraticEquation() {
    try {
        const a = parseFloat(elements.quadA.value);
        const b = parseFloat(elements.quadB.value);
        const c = parseFloat(elements.quadC.value);
        
        const discriminant = b * b - 4 * a * c;
        
        if (discriminant < 0) {
            const realPart = -b / (2 * a);
            const imagPart = Math.sqrt(-discriminant) / (2 * a);
            state.currentResult = `x₁ = ${formatResult(realPart)} + ${formatResult(imagPart)}i\nx₂ = ${formatResult(realPart)} - ${formatResult(imagPart)}i`;
        } else {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            state.currentResult = `x₁ = ${formatResult(x1)}\nx₂ = ${formatResult(x2)}`;
        }
        
        state.currentExpression = `${a}x² + ${b}x + ${c} = 0`;
        
        updateDisplay();
        addToHistory(state.currentExpression, state.currentResult);
        
    } catch (error) {
        state.currentResult = 'Solver Error: ' + error.message;
        setTimeout(() => {
            state.currentResult = '';
            updateDisplay();
        }, 3000);
    }
}

function calculateDerivative() {
    try {
        const func = elements.derivativeFunc.value;
        const derivative = math.derivative(func, 'x');
        
        state.currentExpression = `d/dx(${func})`;
        state.currentResult = derivative.toString();
        
        updateDisplay();
        addToHistory(state.currentExpression, state.currentResult);
        
    } catch (error) {
        state.currentResult = 'Derivative Error: ' + error.message;
        setTimeout(() => {
            state.currentResult = '';
            updateDisplay();
        }, 3000);
    }
}


const unitDefinitions = {
    length: {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001,
        mile: 1609.344,
        yard: 0.9144,
        foot: 0.3048,
        inch: 0.0254
    },
    mass: {
        kilogram: 1,
        gram: 0.001,
        milligram: 0.000001,
        ton: 1000,
        pound: 0.453592,
        ounce: 0.0283495
    },
    temperature: {
        celsius: { offset: 0, factor: 1 },
        fahrenheit: { offset: 32, factor: 1.8 },
        kelvin: { offset: -273.15, factor: 1 }
    },
    time: {
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        month: 2592000,
        year: 31536000
    }
};

function populateConverterUnits() {
    const type = elements.unitType.value;
    const units = Object.keys(unitDefinitions[type]);
    
    elements.fromUnit.innerHTML = '';
    elements.toUnit.innerHTML = '';
    
    units.forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
        elements.fromUnit.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);
        elements.toUnit.appendChild(option2);
    });
    
    if (units.length > 1) {
        elements.toUnit.selectedIndex = 1;
    }
    
    convertUnits();
}

function convertUnits() {
    const type = elements.unitType.value;
    const fromVal = parseFloat(elements.fromValue.value) || 0;
    const fromUnitVal = elements.fromUnit.value;
    const toUnitVal = elements.toUnit.value;
    
    let result;
    
    if (type === 'temperature') {
        result = convertTemperature(fromVal, fromUnitVal, toUnitVal);
    } else {
        const fromFactor = unitDefinitions[type][fromUnitVal];
        const toFactor = unitDefinitions[type][toUnitVal];
        result = (fromVal * fromFactor) / toFactor;
    }
    
    elements.toValue.value = formatResult(result);
}

function convertTemperature(value, from, to) {
    let celsius;
    if (from === 'celsius') {
        celsius = value;
    } else if (from === 'fahrenheit') {
        celsius = (value - 32) / 1.8;
    } else if (from === 'kelvin') {
        celsius = value - 273.15;
    }
    
    if (to === 'celsius') {
        return celsius;
    } else if (to === 'fahrenheit') {
        return celsius * 1.8 + 32;
    } else if (to === 'kelvin') {
        return celsius + 273.15;
    }
}


function switchMode(mode) {
    state.currentMode = mode;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.mode === mode) {
            btn.classList.add('active');
        }
    });
    
    Object.keys(elements.panels).forEach(key => {
        elements.panels[key].classList.remove('active');
    });
    elements.panels[mode].classList.add('active');
    
    if (mode === 'matrix' || mode === 'solver' || mode === 'converter') {
        state.currentExpression = '0';
        state.currentResult = '';
        updateDisplay();
    }
}


function toggleSidebar(type) {
    const historyActive = elements.historySidebar.classList.contains('active');
    const settingsActive = elements.settingsSidebar.classList.contains('active');
    
    if (type === 'history') {
        if (historyActive) {
            closeSidebars();
        } else {
            elements.historySidebar.classList.add('active');
            elements.settingsSidebar.classList.remove('active');
            elements.overlay.classList.add('active');
            renderHistory();
        }
    } else if (type === 'settings') {
        if (settingsActive) {
            closeSidebars();
        } else {
            elements.settingsSidebar.classList.add('active');
            elements.historySidebar.classList.remove('active');
            elements.overlay.classList.add('active');
        }
    }
}

function closeSidebars() {
    elements.historySidebar.classList.remove('active');
    elements.settingsSidebar.classList.remove('active');
    elements.overlay.classList.remove('active');
}


function addToHistory(expression, result) {
    const historyItem = {
        expression,
        result,
        timestamp: Date.now()
    };
    
    state.history.unshift(historyItem);
    
    if (state.history.length > 50) {
        state.history = state.history.slice(0, 50);
    }
    
    saveHistory();
}

function renderHistory() {
    if (state.history.length === 0) {
        elements.historyContent.innerHTML = '<p class="empty-message">Henüz hesaplama yok</p>';
        return;
    }
    
    elements.historyContent.innerHTML = state.history.map((item, index) => `
        <div class="history-item" onclick="loadHistoryItem(${index})">
            <div class="history-expression">${item.expression}</div>
            <div class="history-result">${item.result}</div>
        </div>
    `).join('');
}

function loadHistoryItem(index) {
    const item = state.history[index];
    state.currentExpression = item.result.toString();
    state.currentResult = '';
    updateDisplay();
    closeSidebars();
}

function clearHistory() {
    if (confirm('Tüm geçmişi silmek istediğinizden emin misiniz?')) {
        state.history = [];
        saveHistory();
        renderHistory();
    }
}

function saveHistory() {
    try {
        localStorage.setItem('calculator-history', JSON.stringify(state.history));
    } catch (e) {
        console.error('Failed to save history:', e);
    }
}

function loadHistory() {
    try {
        const saved = localStorage.getItem('calculator-history');
        if (saved) {
            state.history = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load history:', e);
    }
}


function saveSettings() {
    try {
        const settings = {
            precision: state.precision,
            angleMode: state.angleMode,
            soundEnabled: state.soundEnabled
        };
        localStorage.setItem('calculator-settings', JSON.stringify(settings));
    } catch (e) {
        console.error('Failed to save settings:', e);
    }
}

function loadSettings() {
    try {
        const saved = localStorage.getItem('calculator-settings');
        if (saved) {
            const settings = JSON.parse(saved);
            state.precision = settings.precision || 10;
            state.angleMode = settings.angleMode || 'deg';
            state.soundEnabled = settings.soundEnabled !== undefined ? settings.soundEnabled : true;
            
            elements.precisionSetting.value = state.precision;
            elements.angleUnitSetting.value = state.angleMode;
            elements.soundSetting.checked = state.soundEnabled;
            
            if (elements.angleMode) {
                elements.angleMode.textContent = state.angleMode.toUpperCase();
            }
        }
    } catch (e) {
        console.error('Failed to load settings:', e);
    }
}


function updateDisplay() {
    elements.expression.textContent = state.currentExpression;
    elements.result.textContent = state.currentResult;
}


function handleKeyboard(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        return;
    }
    
    const key = e.key;
    
    if (/^\d$/.test(key)) {
        handleValue(key);
    } else if (key === '.') {
        handleValue('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleValue(key);
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculateResult();
    } else if (key === 'Escape') {
        handleAction('clear');
    } else if (key === 'Backspace') {
        e.preventDefault();
        handleAction('delete');
    } else if (key === '(' || key === ')') {
        handleValue(key);
    }
}


document.addEventListener('DOMContentLoaded', init);
