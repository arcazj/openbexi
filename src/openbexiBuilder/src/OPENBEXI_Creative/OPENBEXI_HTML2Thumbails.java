package OPENBEXI_Creative;

import com.sun.image.codec.jpeg.JPEGEncodeParam;
import com.sun.image.codec.jpeg.JPEGImageEncoder;
import com.sun.image.codec.jpeg.JPEGCodec;

import javax.swing.*;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.OutputStream;
import java.io.IOException;
import java.io.FileOutputStream;
import java.io.ByteArrayOutputStream;


public class OPENBEXI_HTML2Thumbails {
        public  OPENBEXI_HTML2Thumbails(String url) {
        try {

            OPENBEXI_Browser browser = new OPENBEXI_Browser();
            browser.launch(url);

            Rectangle rect = new Rectangle(0, 0, 1024, 1280);
            Robot robot;
            BufferedImage pageImage;
            Image image = null;
            try {
                robot = new Robot();
                pageImage = robot.createScreenCapture(rect);
                image = Toolkit.getDefaultToolkit().createImage(pageImage.getSource());
            } catch (AWTException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }

            OutputStream out = new FileOutputStream("test1.jpg");
            try {
                createThumb(image, 200, 250, 100, out);
            } catch (Exception e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
            System.exit(0);

        }
        catch (IOException ioe) {
            System.err.println("Error displaying " + url);
        }
    }
    /**
     * Create a reduced jpeg version of an image. The width/height
     * ratio is preserved.
     *
     * @param data        raw data of the image
     * @param thumbWidth  maximum width of the reduced image
     * @param thumbHeight maximum heigth of the reduced image
     * @param quality     jpeg quality of the reduced image
     * @return a reduced jpeg image if the image represented by data is
     *         bigger than the maximum dimensions of the reduced image,
     *         otherwise data is returned
     */
    public static byte[] createThumbArray(byte[] data,
                                          int thumbWidth, int thumbHeight,
                                          int quality)
            throws Exception {
        ByteArrayOutputStream result = new ByteArrayOutputStream();
        createThumb(data, thumbWidth, thumbHeight, quality, result);
        return result.toByteArray();
    }

    /**
     * Create a reduced jpeg version of an image. The width/height
     * ratio is preserved.
     *
     * @param data        raw data of the image
     * @param thumbWidth  maximum width of the reduced image
     * @param thumbHeight maximum heigth of the reduced image
     * @param quality     jpeg quality of the reduced image
     * @param out         produce a reduced jpeg image if the image represented
     *                    by data is bigger than the maximum dimensions of the reduced
     *                    image, otherwise data is written to this stream
     */
    public static void createThumb(byte[] data,
                                   int thumbWidth, int thumbHeight,
                                   int quality,
                                   OutputStream out)
            throws Exception {
        Image image = Toolkit.getDefaultToolkit().createImage(data);
        MediaTracker mediaTracker = new MediaTracker(new Frame());
        int trackID = 0;
        mediaTracker.addImage(image, trackID);
        mediaTracker.waitForID(trackID);
        if (image.getWidth(null) <= thumbWidth &&
                image.getHeight(null) <= thumbHeight)
            out.write(data);
        else
            createThumb(image, thumbWidth, thumbHeight, quality, out);
    }

    /**
     * Create a scaled jpeg of an image. The width/height ratio is
     * preserved.
     * <p/>
     * <p>If image is smaller than thumbWidth x thumbHeight, it will be
     * magnified, otherwise it will be scaled down.</p>
     *
     * @param image       the image to reduce
     * @param thumbWidth  the maximum width of the thumbnail
     * @param thumbHeight the maximum heigth of the thumbnail
     * @param quality     the jpeg quality ot the thumbnail
     * @param out         a stream where the thumbnail data is written to
     */
    public static void createThumb(Image image,
                                   int thumbWidth, int thumbHeight,
                                   int quality,
                                   OutputStream out)
            throws Exception {
        int imageWidth = image.getWidth(null);
        int imageHeight = image.getHeight(null);
        double thumbRatio = (double) thumbWidth / (double) thumbHeight;
        double imageRatio = (double) imageWidth / (double) imageHeight;
        if (thumbRatio < imageRatio) {
            thumbHeight = (int) (thumbWidth / imageRatio);
        } else {
            thumbWidth = (int) (thumbHeight * imageRatio);
        }
        // draw original image to thumbnail image object and
        // scale it to the new size on-the-fly
        BufferedImage thumbImage =
                new BufferedImage(thumbWidth,
                        thumbHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics2D = thumbImage.createGraphics();
        graphics2D.setRenderingHint(RenderingHints.KEY_COLOR_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY);
        graphics2D.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
        graphics2D.drawImage(image, 0, 0, thumbWidth, thumbHeight, null);
        // save thumbnail image to out stream
        JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
        JPEGEncodeParam param = encoder.
                getDefaultJPEGEncodeParam(thumbImage);

        quality = Math.max(0, Math.min(quality, 100));
        param.setQuality((float) quality / 1.0f, false);
        encoder.setJPEGEncodeParam(param);
        encoder.encode(thumbImage);
    }

    public static void main(String[] args) {
        OPENBEXI_HTML2Thumbails thumb = new OPENBEXI_HTML2Thumbails("http:www.openbexi.com");
    }
}
