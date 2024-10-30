import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Button,
} from "react-native";
import { COLORS, FONT_SIZE, SPACING, FONT_FAMILY } from "../../constants/theme";
import {
  getBooks,
  deleteBook,
  createBook,
  updateBook,
} from "../../services/api";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBook, setCurrentBook] = useState({ title: "", author: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      Alert.alert("Failed to delete book", error.message);
    }
  };

  const handleSaveBook = async () => {
    try {
      if (isEditing) {
        await updateBook(currentBook.id, {
          title: currentBook.title,
          author: currentBook.author,
        });
      } else {
        await createBook({
          title: currentBook.title,
          author: currentBook.author,
        });
      }

      console.log("arrived 1 reveserd");
      await fetchBooks();
      console.log("arrived 1");

      await closeModal();

      console.log("arrived 2");
    } catch (error) {
      Alert.alert("Failed to save book", error.message);
    }
  };

  const openModal = (book = { title: "", author: "" }) => {
    setCurrentBook(book);
    setIsEditing(!!book.id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setCurrentBook({ title: "", author: "" });
    setIsEditing(false);
    setIsModalVisible(false);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Library</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title or author"
        placeholderTextColor={COLORS.textSecondary}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookContainer}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => openModal(item)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteBook(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
        <Text style={styles.addButtonText}>Add Book</Text>
      </TouchableOpacity>

      {/* Modal para Adicionar/Editar Livro */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEditing ? "Edit Book" : "Add Book"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor={COLORS.textSecondary}
              value={currentBook.title}
              onChangeText={(text) =>
                setCurrentBook({ ...currentBook, title: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Author"
              placeholderTextColor={COLORS.textSecondary}
              value={currentBook.author}
              onChangeText={(text) =>
                setCurrentBook({ ...currentBook, author: text })
              }
            />
            <Button title="Save" onPress={handleSaveBook} />
            <Button title="Cancel" color="red" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.large,
  },
  title: {
    fontSize: FONT_SIZE.xLarge,
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.bold,
    marginBottom: SPACING.large,
  },
  searchInput: {
    width: "100%",
    padding: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: SPACING.large,
    fontSize: FONT_SIZE.medium,
    color: COLORS.textPrimary,
  },
  bookContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  bookTitle: {
    fontSize: FONT_SIZE.large,
    color: COLORS.textPrimary,
    fontFamily: FONT_FAMILY.regular,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    padding: SPACING.small,
    marginRight: SPACING.small,
  },
  editButtonText: {
    color: "#fff",
    fontSize: FONT_SIZE.medium,
  },
  deleteButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
    padding: SPACING.small,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: FONT_SIZE.medium,
  },
  addButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
    padding: SPACING.medium,
    alignItems: "center",
    marginTop: SPACING.large,
  },
  addButtonText: {
    color: "#fff",
    fontSize: FONT_SIZE.large,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.background,
    padding: SPACING.large,
    margin: SPACING.large,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: FONT_SIZE.large,
    color: COLORS.primary,
    marginBottom: SPACING.medium,
  },
  input: {
    padding: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: SPACING.medium,
    fontSize: FONT_SIZE.medium,
    color: COLORS.textPrimary,
  },
});
