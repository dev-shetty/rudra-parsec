declare module "jspdf" {
  class jsPDF {
    constructor(options?: jsPDF.Options);

    splitTextToSize(text: string, maxWidth: number): string[];
    text(
      text: string | string[],
      x: number,
      y: number,
      options?: jsPDF.TextOptions
    ): jsPDF;
    setFontSize(size: number): jsPDF;
    setFont(size: string): jsPDF;
    save(size: string): jsPDF;

    // Add other methods and properties you use from jsPDF here
  }

  namespace jsPDF {
    interface Options {
      orientation?: "portrait" | "landscape";
      unit?: "mm" | "pt" | "in";
      format?: string | number[] | "a3" | "a4" | "a5" | "letter" | "legal";
    }

    interface TextOptions {
      align?: "left" | "center" | "right" | "justify";
      angle?: number;
    }

    // Add other interfaces and types you use from jsPDF here
  }

  export = jsPDF;
}
