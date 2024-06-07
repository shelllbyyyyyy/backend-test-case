import { countWords, diagonalSum, longest, reverseString } from "../src/main";

describe("Tes ALGORITMA", () => {
  test("Terdapat string 'NEGIE1', silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = 'EIGEN1'", () => {
    const reverse = reverseString("NEGIE1");

    expect(reverse).toBe("EIGEN1");
  });

  test("Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu", () => {
    const sentence = "Saya sangat senang mengerjakan soal algoritma";

    const findLongest = longest(sentence);

    expect(findLongest).toBe("mengerjakan");
  });

  test("Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT", () => {
    const INPUT: string[] = ["xc", "dz", "bbb", "dz"];
    const QUERY: string[] = ["bbb", "ac", "dz"];

    const result = countWords(INPUT, QUERY);

    const toBe = [1, 0, 2];

    expect(result).toStrictEqual(toBe);
  });

  test("Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN Contoh:", () => {
    const matrix: number[][] = [
      [1, 2, 0],
      [4, 5, 6],
      [7, 8, 9],
    ];

    const result = diagonalSum(matrix);

    expect(result).toBe(3);
  });
});
