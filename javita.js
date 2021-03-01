//Contadores
var nodo = 0;
var lineas = 0;
// Conexion de html
var container = document.getElementById("Pantalla");

// Array de nodo
var nodes = new vis.DataSet([]);

// arrat de lineas
var edges = new vis.DataSet([]);

// Savew Data.
var data = {
  nodes: nodes,
  edges: edges,
};var options = {
  interaction: {
    hover: true,
  },
  manipulation: {
    enabled: true,
    initiallyActive: false,
    addNode: function (nodeData, callback) {
      addNode(nodeData, callback);
    },
    addEdge: function (edgeData, callback) {
      addEdge(edgeData, callback);
    },
    editEdge: true,
    deleteNode: false,
    deleteEdge: false,
  },
  nodes: {
    color: "#DCD8D8",
    font: {
      color: "#333333",
      size: 30,
    },
  },
  edges: {
    arrows: {
      to: {
        enabled: true,
        type: "triangle",
      },
    },
    
  },
};
// Agregar
function addNode(nodeData, callback) {
  var label;
  if (nodes.length === 0) {
    nodo = 0;
  }

  while (!valueIsEmpty(label)) {
    label = prompt("Numero de nodo:");
  }
  nodeData.id = nodo++;
  nodeData.label = label;
  nodeData.title = "Nodo " + label;
  callback(nodeData);
}

// Agregar lineas
function addEdge(edgeData, callback) {
  var label;
  if (edges.length === 0) {
    lineas = 0;
  }
  while (!valueIsEmpty(label)) {
    label = prompt("Ingrese el atributo:");
  }
  if (edgeData.from === edgeData.to) {
    var igual = confirm("Conectar asi mismo?");
    if (igual === true) {
      edgeData.id = lineas++;
      edgeData.label = label;
      callback(edgeData);
    }
  } else {
    edgeData.id = lineas++;
    edgeData.label = label;
    callback(edgeData);
  }
}
// Verificar si ingresa
function valueIsEmpty(label) {
  return label && label !== "";
}
// Habilita la pizarra
var network = new vis.Network(container, data, options);
function Matriz() {
  var nodoA = [];
  var valoresA = [];
  let c = 0;

  if (edges.length !== null) {
    // Obtiene valor de nodos y lineas
    if (c < edges.length) {
      const nodes =
        edges.get(c).from.toString() + "-" + edges.get(c).to.toString();
      const values = edges.get(c).label;
      nodoA.push(nodes);
      valoresA.push(values);
      c++;
    }

    // Matriz
    c = 0;
    var matrix = Array(nodes.length)
      .fill(0)
      .map(() => Array(nodes.length).fill(0));
    if (c < nodoA.length) {
      var split = nodoA[c].split("-");
      matrix[parseInt(split[1])][parseInt(split[0])] = valoresA[c];
      c++;
    }

    var filas = [];
    var columna = [];

    // suma filas
    for (let i = 0; i < matrix.length; i++) {
      var rSum = 0;
      var cSum = 0;
      for (let j = 0; j < matrix.length; j++) {
        rSum += parseInt(matrix[i][j]);
        cSum += parseInt(matrix[j][i]);
      }
      filas.push(cSum);
      columna.push(rSum);
    }

    // Obtiene nodos 
    var Matriz = "\t\t";
    c = 0;
    if (c < nodes.length) {
      Matriz += nodes.get(c).label + "\t\t";
      c++;
    }

    Matriz += "\n";

    // filas de suma
    for (let i = 0; i < matrix.length; i++) {
      Matriz += nodes.get(i).label + "\t\t";
      for (let z = 0; z < matrix.length; z++) {
        Matriz += matrix[z][i] + "\t\t";
      }
      Matriz += filas[i] + "\n";
    }

    // columna de suma
    c = 0;
    Matriz += "\n\t\t";
    if (c < columna.length) {
      Matriz += columna[c] + "\t\t";
      c++;
    }

    // Mostrar matriz
    document.getElementById("matriz").innerText = Matriz;
  }
}

