
import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

export default function App() {
  const [verReceitaVisivel, setVerReceitaVisivel] = useState(false);
  const [verCadastroVisivel, setVerCadastroVisivel] = useState(false);

  const [nomeReceita, setNomeReceita] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');

  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: 'Bolo de Cenoura',
      ingredientes:
        '3 cenouras médias\n3 ovos\n1 xícara de óleo\n2 xícaras de açúcar\n2 xícaras de farinha de trigo\n1 colher de sopa de fermento em pó',
      preparo:
        '1. Descasque e corte as cenouras.\n\n2. Bata as cenouras, os ovos e o óleo no liquidificador.\n\n3. Misture com o açúcar e a farinha de trigo.\n\n4. Acrescente o fermento delicadamente.\n\n5. Asse em forno preaquecido a 180 °C por aproximadamente 40 minutos.'
    }
  ]);

  function limparCampos() {
    setNomeReceita('');
    setIngredientes('');
    setModoPreparo('');
  }

  function salvarReceita() {
    if (
      !nomeReceita.trim() ||
      !ingredientes.trim() ||
      !modoPreparo.trim()
    ) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de salvar.');
      return;
    }

    const novaReceita = {
      id: Date.now().toString(),
      nome: nomeReceita.trim(),
      ingredientes: ingredientes.trim(),
      preparo: modoPreparo.trim()
    };

    setReceitas([...receitas, novaReceita]);

    Alert.alert('Sucesso', 'Receita cadastrada com sucesso!');

    limparCampos();
    setVerCadastroVisivel(false);
  }

  function cancelarCadastro() {
    limparCampos();
    setVerCadastroVisivel(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 App de Receitas</Text>

      <Text style={styles.subtitle}>
        Colecione suas receitas preferidas
      </Text>

      <ScrollView
        style={styles.recipeList}
        contentContainerStyle={styles.recipeListContent}
      >
        {receitas.map((receita) => (
          <View key={receita.id} style={styles.recipeCard}>
            <Text style={styles.cardTitle}>
              🍽️ {receita.nome}
            </Text>

            <View style={styles.cardButton}>
              <Button
                title="Ver Receita"
                color="#D9381E"
                onPress={() => {
                  setReceitaSelecionada(receita);
                  setVerReceitaVisivel(true);
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal para visualizar uma receita */}
      <Modal
        visible={verReceitaVisivel}
        animationType="slide"
        onRequestClose={() => setVerReceitaVisivel(false)}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          {receitaSelecionada && (
            <>
              <Text style={styles.recipeTitle}>
                🍰 {receitaSelecionada.nome}
              </Text>

              <Text style={styles.sectionTitle}>
                🥕 Ingredientes
              </Text>

              <Text style={styles.recipeText}>
                {receitaSelecionada.ingredientes}
              </Text>

              <Text style={styles.sectionTitle}>
                👨‍🍳 Modo de Preparo
              </Text>

              <Text style={styles.recipeText}>
                {receitaSelecionada.preparo}
              </Text>
            </>
          )}

          <View style={styles.closeButton}>
            <Button
              title="Fechar Receita"
              color="#D9381E"
              onPress={() => setVerReceitaVisivel(false)}
            />
          </View>
        </ScrollView>
      </Modal>

      {/* Segundo Modal: cadastro de receitas */}
      <Modal
        visible={verCadastroVisivel}
        animationType="slide"
        onRequestClose={cancelarCadastro}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.recipeTitle}>
            📝 Nova Receita
          </Text>

          <Text style={styles.inputLabel}>
            Nome da Receita
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome da receita"
            placeholderTextColor="#9B8580"
            value={nomeReceita}
            onChangeText={setNomeReceita}
          />

          <Text style={styles.inputLabel}>
            Ingredientes
          </Text>

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Digite os ingredientes"
            placeholderTextColor="#9B8580"
            value={ingredientes}
            onChangeText={setIngredientes}
            multiline={true}
            textAlignVertical="top"
          />

          <Text style={styles.inputLabel}>
            Modo de Preparo
          </Text>

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Descreva o modo de preparo"
            placeholderTextColor="#9B8580"
            value={modoPreparo}
            onChangeText={setModoPreparo}
            multiline={true}
            textAlignVertical="top"
          />

          <View style={styles.formButton}>
            <Button
              title="Salvar"
              color="#D9381E"
              onPress={salvarReceita}
            />
          </View>

          <View style={styles.formButton}>
            <Button
              title="Cancelar"
              color="#6E5A58"
              onPress={cancelarCadastro}
            />
          </View>
        </ScrollView>
      </Modal>

      {/* Botão flutuante para adicionar receitas */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setVerCadastroVisivel(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    paddingTop: 60,
    paddingHorizontal: 20
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4A2E2B',
    marginBottom: 8,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6E5A58',
    marginBottom: 24,
    textAlign: 'center'
  },

  recipeList: {
    flex: 1,
    width: '100%'
  },

  recipeListContent: {
    paddingBottom: 100
  },

  recipeCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0DCD2',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A2E2B',
    marginBottom: 14
  },

  cardButton: {
    alignSelf: 'flex-start',
    minWidth: 140
  },

  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#FFF8F2',
    padding: 24
  },

  recipeTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4A2E2B',
    textAlign: 'center',
    marginBottom: 28,
    marginTop: 20
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#D9381E',
    marginBottom: 12,
    marginTop: 12
  },

  recipeText: {
    fontSize: 16,
    lineHeight: 25,
    color: '#4A2E2B',
    marginBottom: 18
  },

  closeButton: {
    marginTop: 20,
    marginBottom: 30
  },

  inputLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4A2E2B',
    marginBottom: 8,
    marginTop: 12
  },

  input: {
    borderWidth: 1,
    borderColor: '#D9BDB2',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#4A2E2B',
    backgroundColor: '#FFFFFF',
    marginBottom: 12
  },

  multilineInput: {
    minHeight: 120
  },

  formButton: {
    marginTop: 12
  },

  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D9381E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold'
  }
});
