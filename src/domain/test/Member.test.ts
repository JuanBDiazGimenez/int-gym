import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import type { Plan } from "../Member.ts";

describe("Member", () => {
  let member: Member;

  beforeEach(() => {
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("store name", () => {
    expect(member.name).toBe("Ana Pérez");
  });

  test("store document id", () => {
    expect(member.documentId).toBe("12345678");
  });

  test("store plan", () => {
    expect(member.plan).toBe("full");
  });

  test("store monthly fee", () => {
    expect(member.monthlyFee).toBe(1500);
  });

  test("reject an empty name", () => {
    expect(() => (member.name = "   ")).toThrow();
  });

  test("reject a document id with letters", () => {
    expect(() => (member.documentId = "12a45")).toThrow();
  });

  test("reject a monthly fee of zero", () => {
    expect(() => (member.monthlyFee = 0)).toThrow();
  });

  test("reject an invalid plan", () => {
    expect(() => (member.plan = "gold" as Plan)).toThrow();
  });

  test("reject a monthly fee that is not a number", () => {
    expect(() => (member.monthlyFee = Number.NaN)).toThrow();
  });

  test("show the member as text", () => {
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500",
    );
  });

  //tests del a
  test("discount of 0 by default", () => {
    expect(member.discount).toBe(0);
  });

  test("reject a discount fee of -1", () => {
    expect(() => (member.discount = -1)).toThrow();
  });

  test("reject a discount fee of 101", () => {
    expect(() => (member.discount = 101)).toThrow();
  });

  test("accept discount of 10", () => {
    member.discount = 10;
    expect(member.discount).toBe(10);
  });

  test("accept discount of 100", () => {
    member.discount = 100;
    expect(member.discount).toBe(100);
  });

  test("reject a discount fee of 10.5", () => {
    expect(() => (member.discount = 10.5)).toThrow();
  });

  test("show the discount as text", () => {
    member.discount = 10;
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500 - Descuento: 10%",
    );
  });
});
