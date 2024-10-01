import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";

// Enum para definir as escolhas
enum Choice {
  Rock = "Pedra",
  Paper = "Papel",
  Scissors = "Tesoura",
}

// Lista com as opções de escolha
const choices = [Choice.Rock, Choice.Paper, Choice.Scissors];

// Função para selecionar uma escolha aleatória para o computador
const getRandomChoice = () => {
  return choices[Math.floor(Math.random() * choices.length)];
};

export default function App() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<string>("");
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Função para iniciar uma nova rodada
  const playRound = (choice: Choice) => {
    const computerSelected = getRandomChoice();
    setPlayerChoice(choice);
    setComputerChoice(computerSelected);
    setResult(determineResult(choice, computerSelected));
    animateScale(); // Inicia a animação ao escolher uma opção
  };

  // Função para determinar o resultado do jogo
  const determineResult = (player: Choice, computer: Choice) => {
    if (player === computer) return "Empate!";
    if (
      (player === Choice.Rock && computer === Choice.Scissors) ||
      (player === Choice.Paper && computer === Choice.Rock) ||
      (player === Choice.Scissors && computer === Choice.Paper)
    ) {
      return "Você venceu!";
    }
    return "Você perdeu!";
  };

  // Função para animar a escala dos resultados
  const animateScale = () => {
    scaleAnim.setValue(1);
    Animated.timing(scaleAnim, {
      toValue: 1.5,
      duration: 500,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedra, Papel ou Tesoura</Text>

      {/* Botões de escolha */}
      <View style={styles.choicesContainer}>
        <TouchableOpacity
          onPress={() => playRound(Choice.Rock)}
          style={styles.choiceButton}
        >
          <Text style={styles.choiceText}>Pedra</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => playRound(Choice.Paper)}
          style={styles.choiceButton}
        >
          <Text style={styles.choiceText}>Papel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => playRound(Choice.Scissors)}
          style={styles.choiceButton}
        >
          <Text style={styles.choiceText}>Tesoura</Text>
        </TouchableOpacity>
      </View>

      {/* Exibição do resultado */}
      {playerChoice && computerChoice && (
        <Animated.View
          style={[
            styles.resultContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text style={styles.resultText}>Você escolheu: {playerChoice}</Text>
          <Text style={styles.resultText}>
            Computador escolheu: {computerChoice}
          </Text>
          <Text style={styles.resultText}>{result}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  choicesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  choiceButton: {
    padding: 20,
    backgroundColor: "#007bff",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  choiceText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#007bff",
    borderWidth: 2,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
